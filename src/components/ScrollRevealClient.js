"use client";

import { useEffect } from "react";
import ScrollReveal from "@/lib/classes/ScrollReveal";

/*
  A tiny client component whose only job is to start the ScrollReveal class
  after the page mounts in the browser (the class touches window/document, so
  it can't run on the server). Drop <ScrollRevealClient /> once on a page and
  every element with a data-reveal attribute will fade in on scroll.
*/
export default function ScrollRevealClient() {
  useEffect(() => {
    const reveal = new ScrollReveal().start();
    return () => reveal.stop();
  }, []);

  return null;
}
