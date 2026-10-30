"use client";

import { useRef, useState } from "react";

export function HeroListen() {
  const [state, setState] = useState<"idle" | "loading" | "playing" | "error">("idle");
  const clip = useRef<string | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);

  async function play() {
    if (state === "loading") return;
    if (audio.current && state === "playing") {
      audio.current.pause();
      setState("idle");
      return;
    }
    setState("loading");
    try {
      if (!clip.current) {
        const body = new FormData();
        body.set("fallback", "yes");
        const response = await fetch("/api/demo/voice", {
          method: "POST",
          body,
          headers: { Accept: "audio/mpeg" },
        });
        if (!response.ok) throw new Error("speech");
        const blob = await response.blob();
        clip.current = URL.createObjectURL(blob);
      }
      const player = audio.current ?? new Audio(clip.current);
      audio.current = player;
      player.onended = () => setState("idle");
      await player.play();
      setState("playing");
    } catch {
      setState("error");
    }
  }

  const label =
    state === "loading" ? "Loading the sample" : state === "playing" ? "Pause the sample" : "Hear it answer a call";

  return (
    <button className="btn hero-play" type="button" onClick={() => void play()}>
      <span className="hero-play-icon" aria-hidden="true">
        {state === "playing" ? (
          <svg viewBox="0 0 16 16">
            <rect x="3" y="2" width="3.2" height="12" rx="0.6" fill="currentColor" />
            <rect x="9.8" y="2" width="3.2" height="12" rx="0.6" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16">
            <path d="M4 2.5v11l10-5.5z" fill="currentColor" />
          </svg>
        )}
      </span>
      {label}
      {state === "error" ? <span className="hero-play-error"> Try again in a moment.</span> : null}
    </button>
  );
}
