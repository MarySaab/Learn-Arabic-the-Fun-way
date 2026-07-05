"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Bilingual from "./Bilingual";
import FormValidator from "@/lib/classes/FormValidator";
import { levels } from "@/lib/data/lessons";
import styles from "./BookingForm.module.css";

// Mariana's contact details (WhatsApp number in international format, digits
// only: Lebanon +961, 71 297 998).
const WHATSAPP_NUMBER = "96171297998";
const CONTACT_EMAIL = "marianasaab50@gmail.com";

const TIME_OPTIONS = [
  { id: "morning",   label: "صباحاً (٩–١٢)" },
  { id: "afternoon", label: "بعد الظهر (١٢–٤)" },
  { id: "evening",   label: "مساءً (٤–٨)" },
  { id: "weekend",   label: "عطلة نهاية الأسبوع" },
];

/*
  BookingForm — a contact/booking form with real-time validation via the
  FormValidator class. The recommended level is pre-filled from the ?level=
  URL param (passed in as initialLevel) but stays editable. Submitting does NOT
  reload the page: it POSTs to /api/booking, then shows a success message with
  buttons that open WhatsApp or email pre-filled with the request summary.
*/
export default function BookingForm({ initialLevel = "" }) {
  const validator = useMemo(() => new FormValidator(), []);

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    level: initialLevel || "",
    preferredTime: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitState, setSubmitState] = useState("idle"); // idle | sending | done | error
  // Where the level came from: "test" (from URL or a saved test result) or "none".
  const [levelSource, setLevelSource] = useState(initialLevel ? "test" : null);

  // If they didn't arrive from the test (no ?level=), try the level saved by the
  // test in localStorage. If there's none, we prompt them to take the test.
  useEffect(() => {
    if (initialLevel) return;
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("lwm-level");
    if (saved) {
      setValues((v) => ({ ...v, level: saved }));
      setLevelSource("test");
    } else {
      setLevelSource("none");
    }
  }, [initialLevel]);

  const update = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    // validate this field live once it's been interacted with
    setErrors((e) => ({ ...e, [name]: validator.validateField(name, value) }));
  };

  const blur = (name) => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((e) => ({ ...e, [name]: validator.validateField(name, values[name]) }));
  };

  const levelLabel = (id) => levels.find((l) => l.id === id)?.ar || "غير محدّد";

  const buildSummary = () => {
    const time = TIME_OPTIONS.find((t) => t.id === values.preferredTime)?.label || "—";
    return (
      `مرحباً، أنا ${values.name}.\n` +
      `أودّ حجز حصّة لتعلّم اللّغة العربية.\n` +
      `الدولة: ${values.country || "—"}\n` +
      `المستوى: ${levelLabel(values.level)}\n` +
      `الوقت المفضّل: ${time}\n` +
      (values.message ? `ملاحظة: ${values.message}` : "")
    );
  };

  const whatsappHref = () =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildSummary())}`;
  const mailtoHref = () =>
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("طلب حجز حصّة")}&body=${encodeURIComponent(buildSummary())}`;

  const handleSubmit = async () => {
    const allErrors = validator.validateAll(values);
    setErrors(allErrors);
    setTouched({ name: true, email: true, phone: true, country: true, preferredTime: true });
    if (!validator.isValid(values)) return;

    setSubmitState("sending");
    try {
      await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      setSubmitState("done"); // save is best-effort; show success regardless
    } catch {
      setSubmitState("done");
    }
  };

  // -------------------- SUCCESS VIEW --------------------
  if (submitState === "done") {
    return (
      <div className={styles.success} data-reveal>
        <div className={styles.successIcon} aria-hidden="true">✓</div>
        <h2>تمّ إرسال طلبك بنجاح!</h2>
        <p>
          شكراً {values.name}! سنتواصل معك قريباً. يمكنك أيضاً إرسال طلبك مباشرةً عبر:
        </p>
        <div className={styles.successActions}>
          <a className="btn btn-primary" href={whatsappHref()} target="_blank" rel="noreferrer">
            💬 واتساب
          </a>
          <a className="btn btn-gold" href={mailtoHref()}>
            ✉️ بريد إلكتروني
          </a>
          <Link href="/lessons" className="btn btn-ghost">
            تصفّح الدروس
          </Link>
        </div>
      </div>
    );
  }

  // -------------------- FORM VIEW --------------------
  const fieldError = (name) => touched[name] && errors[name];

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()} noValidate>
      {levelSource === "none" && (
        <div className={styles.notice}>
          <p>
            لم تأخذ اختبار تحديد المستوى بعد. خذ الاختبار القصير أولاً لنعرف مستواك
            ونضعك في المجموعة المناسبة.
          </p>
          <Link href="/test" className="btn btn-gold">ابدأ اختبار المستوى</Link>
        </div>
      )}
      {levelSource === "test" && values.level && (
        <div className={styles.levelNote}>
          ✓ مستواك من الاختبار:{" "}
          <strong>{levels.find((l) => l.id === values.level)?.ar}</strong>
        </div>
      )}

      <div className={styles.field}>
        <label htmlFor="name"><Bilingual ar="الاسم" en="Name" /></label>
        <input
          id="name" type="text" value={values.name}
          onChange={(e) => update("name", e.target.value)}
          onBlur={() => blur("name")}
          className={fieldError("name") ? styles.invalid : ""}
        />
        {fieldError("name") && <span className={styles.error}>{errors.name}</span>}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="email"><Bilingual ar="البريد الإلكتروني" en="Email" /></label>
          <input
            id="email" type="email" value={values.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => blur("email")}
            className={fieldError("email") ? styles.invalid : ""}
            dir="ltr"
          />
          {fieldError("email") && <span className={styles.error}>{errors.email}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor="phone"><Bilingual ar="رقم الهاتف" en="Phone" /></label>
          <input
            id="phone" type="tel" value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            onBlur={() => blur("phone")}
            className={fieldError("phone") ? styles.invalid : ""}
            dir="ltr"
          />
          {fieldError("phone") && <span className={styles.error}>{errors.phone}</span>}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="country"><Bilingual ar="الدولة" en="Country" /></label>
          <input
            id="country" type="text" value={values.country}
            onChange={(e) => update("country", e.target.value)}
            onBlur={() => blur("country")}
            className={fieldError("country") ? styles.invalid : ""}
            placeholder="مثال: لبنان، فرنسا، كندا…"
          />
          {fieldError("country") && <span className={styles.error}>{errors.country}</span>}
        </div>

        <div className={styles.field}>
          <label><Bilingual ar="المستوى (من الاختبار)" en="Level (from the test)" /></label>
          <div className={styles.levelReadonly} aria-readonly="true">
            {values.level
              ? levels.find((l) => l.id === values.level)?.ar
              : "يُحدَّد تلقائياً بعد الاختبار"}
          </div>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="preferredTime"><Bilingual ar="الوقت المفضّل" en="Preferred time" /></label>
          <select
            id="preferredTime" value={values.preferredTime}
            onChange={(e) => update("preferredTime", e.target.value)}
            onBlur={() => blur("preferredTime")}
            className={fieldError("preferredTime") ? styles.invalid : ""}
          >
            <option value="">— اختر —</option>
            {TIME_OPTIONS.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
          {fieldError("preferredTime") && <span className={styles.error}>{errors.preferredTime}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="message"><Bilingual ar="ملاحظة (اختياري)" en="Message (optional)" /></label>
        <textarea
          id="message" rows={3} value={values.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </div>

      <button
        type="button"
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={submitState === "sending"}
      >
        {submitState === "sending" ? "جارٍ الإرسال…" : "أرسل الطلب"}
      </button>
    </form>
  );
}
