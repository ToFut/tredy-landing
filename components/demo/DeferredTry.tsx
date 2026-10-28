"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ComponentProps } from "react";

const Live = dynamic(() => import("@/components/demo/TryItLive").then((mod) => mod.TryItLive), {
  ssr: false,
});

export function DeferredTry(props: ComponentProps<typeof Live>) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const watch = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setShow(true);
      },
      { rootMargin: "160px" },
    );
    watch.observe(node);
    return () => watch.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {show ? <Live {...props} /> : <div className="deferred-demo-hold" aria-hidden="true" />}
    </div>
  );
}
