"use client";

import { useLayoutEffect } from "react";

export function Reveal() {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nodes = [...document.querySelectorAll<HTMLElement>(".rise")];
    for (const node of nodes) {
      if (node.getBoundingClientRect().top > window.innerHeight) node.classList.add("wait");
    }
    const watch = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.remove("wait");
        entry.target.classList.add("on");
        watch.unobserve(entry.target);
      }
    });
    for (const node of nodes) watch.observe(node);
    return () => watch.disconnect();
  }, []);
  return null;
}
