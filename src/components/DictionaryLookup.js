"use client";

import { useRef, useState } from "react";
import ApiClient from "@/lib/classes/ApiClient";
import Bilingual from "./Bilingual";

/*
  DictionaryLookup — the SECOND external, key-based API (API Ninjas Dictionary),
  styled with Bootstrap 5. A foreign learner types an English word and gets its
  definition. Demonstrates a live query against the API plus the required
  loading / error / empty / ready states.
*/
const client = new ApiClient();

export default function DictionaryLookup() {
  const [term, setTerm] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | error | empty | ready
  const [result, setResult] = useState(null);
  const controllerRef = useRef(null);

  const lookup = (e) => {
    e?.preventDefault();
    const word = term.trim();
    if (!word) return;

    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setStatus("loading");
    client
      .fetchDictionary(word, { signal: controller.signal })
      .then((data) => {
        if (data?.error || !data) {
          setStatus("error");
        } else if (!data.definition) {
          setResult({ word });
          setStatus("empty");
        } else {
          setResult(data);
          setStatus("ready");
        }
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setStatus("error");
      });
  };

  return (
    <section className="mb-5" dir="rtl">
      <div className="text-center mb-3">
        <h2 className="h4 fw-bold" style={{ color: "var(--teal-deep)" }}>
          <Bilingual ar="📖 قاموس إنجليزي" en="English Word Helper" />
        </h2>
        <p className="text-secondary mb-0">
          <Bilingual
            ar="صادفت كلمة إنجليزية؟ اكتبها لتعرف معناها (من API Ninjas)"
            en="Met an English word? Type it to get its meaning (via API Ninjas)"
          />
        </p>
      </div>

      <form className="row justify-content-center g-2 mb-3" onSubmit={lookup}>
        <div className="col-12 col-md-8 col-lg-6">
          <div className="input-group input-group-lg shadow-sm">
            <input
              type="text"
              className="form-control"
              placeholder="e.g. language"
              aria-label="English word"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              dir="ltr"
            />
            <button className="btn btn-success px-4" type="submit" disabled={status === "loading"}>
              {status === "loading" ? "…" : <Bilingual ar="ابحث" en="Look up" />}
            </button>
          </div>
        </div>
      </form>

      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          {status === "loading" && (
            <div className="text-center py-3">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">جارٍ البحث…</span>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="alert alert-danger text-center" role="alert">
              حدث خطأ، حاول مرة أخرى.
            </div>
          )}

          {status === "empty" && (
            <div className="alert alert-warning text-center" role="alert" dir="ltr">
              No definition found for “{result?.word}”.
            </div>
          )}

          {status === "ready" && result && (
            <div className="card shadow-sm border-0" dir="ltr">
              <div className="card-body">
                <h3 className="card-title h5 text-success text-capitalize">{result.word}</h3>
                <p className="card-text mb-0">{result.definition}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
