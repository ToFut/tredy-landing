"use client";

import { useEffect, useRef } from "react";

export function DemoLoop() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const watch = new IntersectionObserver(
      ([entry]) => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (entry?.isIntersecting && !reduce) void node.play().catch(() => undefined);
      },
      { rootMargin: "160px" },
    );
    watch.observe(node);
    return () => watch.disconnect();
  }, []);

  return (
    <div className="demo-loop">
      <video
        ref={ref}
        poster="/demo/poster.jpg"
        muted
        loop
        playsInline
        preload="none"
        aria-label="Muted demo of an AI receptionist answering a call for Harbor Roofing"
      >
        <source src="/demo/loop.webm" type="video/webm" />
        <source src="/demo/loop.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
