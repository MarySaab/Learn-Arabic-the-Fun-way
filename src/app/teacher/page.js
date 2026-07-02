"use client";

import { useCallback, useEffect, useState } from "react";
import Bilingual from "@/components/Bilingual";
import { levels } from "@/lib/data/lessons";
import { toArabicDigits } from "@/lib/format";
import styles from "./page.module.css";

/*
  Teacher dashboard (Mariana only) — reached at /teacher (not in the navbar).
  She enters her passcode once per browser session; the page then shows:
    - totals: placement tests taken, booking requests
    - level distribution of the tested students (with bars)
    - the booking list (name, level, preferred time, phone, email)
  Data comes from /api/teacher, which checks the passcode server-side.
*/
const TIME_LABELS = {
  morning: "صباحاً",
  afternoon: "بعد الظهر",
  evening: "مساءً",
  weekend: "نهاية الأسبوع",
};

export default function TeacherPage() {
  const [code, setCode] = useState("");
  // idle | loading | unauth | noconfig | nodb | error | ready
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState(null);

  const load = useCallback(async (passcode) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/teacher", {
        headers: { "x-teacher-code": passcode },
        cache: "no-store",
      });
      if (res.status === 401) {
        sessionStorage.removeItem("lwm-teacher-code");
        setStatus("unauth");
        return;
      }
      const json = await res.json();
      if (!res.ok) {
        setStatus(json.reason === "not-configured" ? "noconfig"
          : json.reason === "db-unavailable" ? "nodb" : "error");
        return;
      }
      sessionStorage.setItem("lwm-teacher-code", passcode);
      setData(json);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, []);

  // Re-use the passcode for the rest of the browser session.
  useEffect(() => {
    const saved = sessionStorage.getItem("lwm-teacher-code");
    if (saved) load(saved);
  }, [load]);

  const levelAr = (id) => levels.find((l) => l.id === id)?.ar || id || "—";
  const fmtDate = (d) =>
    new Date(d).toLocaleDateString("ar-LB", { day: "numeric", month: "long" });

  // ---------------- gate / states ----------------
  if (status !== "ready") {
    return (
      <section className="container">
        <header className={styles.head}>
          <h1><Bilingual ar="لوحة المعلّمة" en="Teacher Dashboard" /></h1>
          <p>هذه الصفحة خاصّة بمريانا لمتابعة الطلاب ومستوياتهم.</p>
        </header>

        <div className={styles.gate}>
          <label htmlFor="passcode" className={styles.gateLabel}>رمز الدخول</label>
          <input
            id="passcode"
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && code && load(code)}
            className={styles.gateInput}
            dir="ltr"
          />
          <button
            className="btn btn-primary"
            onClick={() => code && load(code)}
            disabled={status === "loading"}
          >
            {status === "loading" ? "جارٍ التحقّق…" : "دخول"}
          </button>

          {status === "unauth" && <p className={styles.gateError}>رمز الدخول غير صحيح.</p>}
          {status === "noconfig" && (
            <p className={styles.gateNote}>
              اللوحة غير مهيّأة بعد: أضيفي <code dir="ltr">TEACHER_PASSCODE</code> إلى
              ملف <code dir="ltr">.env</code> (وإلى Vercel عند النشر) ثم أعيدي تشغيل الموقع.
            </p>
          )}
          {status === "nodb" && (
            <p className={styles.gateNote}>
              قاعدة البيانات غير متاحة. تأكّدي من <code dir="ltr">DATABASE_URL</code> في
              <code dir="ltr"> .env</code> وتشغيل <code dir="ltr">npx prisma db push</code>.
            </p>
          )}
          {status === "error" && <p className={styles.gateError}>حدث خطأ، حاولي مرة أخرى.</p>}
        </div>
      </section>
    );
  }

  // ---------------- dashboard ----------------
  const { totals, levelCounts, bookings, results } = data;
  const maxCount = Math.max(1, ...Object.values(levelCounts));

  return (
    <section className="container">
      <header className={styles.head}>
        <h1><Bilingual ar="لوحة المعلّمة" en="Teacher Dashboard" /></h1>
        <p>أهلاً مريانا! هذه آخر نتائج الاختبارات وطلبات الحجز.</p>
      </header>

      {/* totals */}
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statNum}>{toArabicDigits(totals.tests)}</span>
          <span className={styles.statLabel}>اختبار مستوى</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNum}>{toArabicDigits(totals.bookings)}</span>
          <span className={styles.statLabel}>طلب حجز</span>
        </div>
      </div>

      {/* level distribution */}
      <h2 className={styles.subhead}>توزيع المستويات</h2>
      <div className={styles.bars}>
        {levels.map((lv) => {
          const count = levelCounts[lv.id] || 0;
          return (
            <div key={lv.id} className={styles.barRow}>
              <span className={styles.barLabel}>{lv.ar}</span>
              <div className={styles.barTrack}>
                <i
                  className={styles.barFill}
                  style={{ width: `${(count / maxCount) * 100}%` }}
                />
              </div>
              <span className={styles.barCount}>{toArabicDigits(count)}</span>
            </div>
          );
        })}
      </div>

      {/* bookings */}
      <h2 className={styles.subhead}>طلبات الحجز</h2>
      {bookings.length === 0 ? (
        <p className={styles.empty}>لا توجد طلبات حجز بعد.</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>الاسم</th><th>المستوى</th><th>الوقت المفضّل</th>
                <th>الهاتف</th><th>البريد</th><th>التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.name}</td>
                  <td>{levelAr(b.level)}</td>
                  <td>{TIME_LABELS[b.preferredTime] || b.preferredTime || "—"}</td>
                  <td dir="ltr">{b.phone}</td>
                  <td dir="ltr">{b.email}</td>
                  <td>{fmtDate(b.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* recent results */}
      <h2 className={styles.subhead}>آخر نتائج الاختبارات</h2>
      {results.length === 0 ? (
        <p className={styles.empty}>لم يُجرِ أحد الاختبار بعد.</p>
      ) : (
        <ul className={styles.resultList}>
          {results.slice(0, 20).map((r) => (
            <li key={r.id} className={styles.resultItem}>
              <span className={styles.resultLevel}>{levelAr(r.level)}</span>
              <span>النتيجة: {toArabicDigits(r.score)}</span>
              {r.readingGrade && <span>قراءة: {r.readingGrade}</span>}
              {r.writingGrade && <span>كتابة: {r.writingGrade}</span>}
              {r.listeningGrade && <span>استماع: {r.listeningGrade}</span>}
              {r.grammarGrade && <span>قواعد: {r.grammarGrade}</span>}
              <span className={styles.resultDate}>{fmtDate(r.createdAt)}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
