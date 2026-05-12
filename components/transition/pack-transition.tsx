"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

type Stage = "idle" | "closed" | "opening" | "burst" | "done";

const CLOSED_DURATION = 900; // pack visible & closed
const OPEN_ANIM_MS = 700; // pack tear + body slide
const OPEN_TO_BURST = 150; // burst starts 150ms after opening
const OPEN_TO_FADE = 800; // overlay fade starts 800ms after opening
const FADE_DURATION = 800; // overlay fade out duration
const TOTAL_DURATION = CLOSED_DURATION + OPEN_TO_FADE + FADE_DURATION;

export function PackTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [stage, setStage] = useState<Stage>("idle");
  const lockRef = useRef(false);

  const trigger = useCallback(
    (href: string) => {
      if (lockRef.current) return;
      lockRef.current = true;
      setStage("closed");
      router.push(href);
      window.setTimeout(() => setStage("opening"), CLOSED_DURATION);
      window.setTimeout(
        () => setStage("burst"),
        CLOSED_DURATION + OPEN_TO_BURST,
      );
      window.setTimeout(
        () => setStage("done"),
        CLOSED_DURATION + OPEN_TO_FADE,
      );
      window.setTimeout(() => {
        setStage("idle");
        lockRef.current = false;
      }, TOTAL_DURATION);
    },
    [router],
  );

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      if (anchor.getAttribute("target") === "_blank") return;
      if (anchor.hasAttribute("download")) return;
      if (anchor.hasAttribute("data-no-transition")) return;
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      )
        return;
      if (href.startsWith("http://") || href.startsWith("https://")) {
        try {
          const url = new URL(href);
          if (url.origin !== window.location.origin) return;
        } catch {
          return;
        }
      }

      try {
        const target = new URL(href, window.location.origin);
        if (
          target.pathname === pathname &&
          target.search === window.location.search
        ) {
          return;
        }
      } catch {
        // pass
      }

      e.preventDefault();
      e.stopImmediatePropagation();
      trigger(href);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [trigger, pathname]);

  const isOpened = stage === "opening" || stage === "burst" || stage === "done";

  return (
    <AnimatePresence>
      {stage !== "idle" && (
        <motion.div
          key="transition"
          initial={{ opacity: 1 }}
          animate={{ opacity: stage === "done" ? 0 : 1 }}
          transition={{ duration: FADE_DURATION / 1000, ease: "easeOut" }}
          className="pointer-events-none fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-text"
        >
          {/* halos */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(45% 50% at 50% 50%, rgba(255,106,0,0.32) 0%, rgba(255,106,0,0) 65%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(40% 40% at 20% 80%, rgba(139,62,255,0.2) 0%, rgba(139,62,255,0) 60%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(40% 40% at 80% 20%, rgba(0,184,224,0.18) 0%, rgba(0,184,224,0) 60%)",
            }}
          />

          <div aria-hidden className="pointer-events-none absolute inset-0">
            <span className="confetti-dot left-[15%] top-[18%] size-2 bg-yellow" />
            <span className="confetti-dot left-[8%] top-[60%] size-1.5 bg-magenta" />
            <span className="confetti-dot left-[80%] top-[25%] size-2 bg-cyan" />
            <span className="confetti-dot left-[88%] top-[70%] size-1.5 bg-lime" />
            <span className="confetti-dot left-[28%] top-[88%] size-2 bg-orange" />
            <span className="confetti-dot left-[72%] top-[88%] size-1.5 bg-yellow" />
            <span className="confetti-dot left-[50%] top-[12%] size-1.5 bg-magenta" />
          </div>

          {/* PACK */}
          <div className="relative h-[min(540px,82vh)] w-[min(300px,72vw)]">
            {/* TOP TEAR STRIP */}
            <motion.div
              initial={{ y: 0, rotate: 0, opacity: 1 }}
              animate={
                isOpened
                  ? { y: -440, rotate: -14, opacity: 0 }
                  : { y: 0, rotate: 0, opacity: 1 }
              }
              transition={{
                duration: OPEN_ANIM_MS / 1000,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-x-0 top-0 h-[68px] overflow-hidden border-4 border-black bg-text"
            >
              <div className="relative flex h-full items-center justify-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange">
                  ▸ Tear here ◂
                </span>
                <div className="absolute -bottom-1 left-0 right-0 h-2">
                  <div
                    className="h-full"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(90deg, rgba(255,106,0,0.85) 0 8px, transparent 8px 16px)",
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* PACK BODY */}
            <motion.div
              initial={{ y: 0, opacity: 1 }}
              animate={
                isOpened ? { y: 400, opacity: 0 } : { y: 0, opacity: 1 }
              }
              transition={{
                duration: OPEN_ANIM_MS / 1000,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute bottom-0 left-0 right-0 top-[68px] overflow-hidden border-4 border-black"
              style={{
                background:
                  "linear-gradient(180deg, #ff8a1f 0%, #ff6a00 55%, #cc4c00 100%)",
              }}
            >
              {/* background octagons */}
              <svg
                viewBox="0 0 100 100"
                aria-hidden
                className="pointer-events-none absolute -right-14 -top-14 size-72 rotate-12 text-black/15"
              >
                <polygon
                  points="29.3,0 70.7,0 100,29.3 100,70.7 70.7,100 29.3,100 0,70.7 0,29.3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
              <svg
                viewBox="0 0 100 100"
                aria-hidden
                className="pointer-events-none absolute -bottom-14 -left-14 size-72 -rotate-12 text-black/15"
              >
                <polygon
                  points="29.3,0 70.7,0 100,29.3 100,70.7 70.7,100 29.3,100 0,70.7 0,29.3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>

              {/* HOLOGRAPHIC SHINE — sweeps across while closed */}
              {stage === "closed" && (
                <motion.div
                  initial={{ x: "-110%" }}
                  animate={{ x: "110%" }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 0,
                  }}
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.5) 50%, transparent 65%)",
                    mixBlendMode: "overlay",
                  }}
                />
              )}

              <div className="relative flex h-full flex-col items-center justify-between gap-4 p-6 text-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/80">
                  Slab Pack · Vol. 01
                </span>

                {/* breathing logo */}
                <motion.div
                  animate={
                    stage === "closed"
                      ? { scale: [1, 1.05, 1] }
                      : { scale: 1 }
                  }
                  transition={
                    stage === "closed"
                      ? {
                          duration: 0.9,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                      : { duration: 0.2 }
                  }
                  className="rounded-2xl border-2 border-black bg-text px-5 py-4"
                >
                  <Image
                    src="/brand/logo.png"
                    alt="Slablabs"
                    width={240}
                    height={60}
                    priority
                    className="h-14 w-auto"
                  />
                </motion.div>

                <p className="font-display text-3xl uppercase leading-[0.92] tracking-tight text-black">
                  Encase
                  <br />
                  <span className="text-text">the art.</span>
                </p>

                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/70">
                    First edition
                  </span>
                  <span className="font-display text-2xl leading-none text-black">
                    №&nbsp;001
                  </span>
                </div>
              </div>
            </motion.div>

            {/* LIGHT BURST */}
            <AnimatePresence>
              {(stage === "opening" || stage === "burst") && (
                <motion.div
                  key="burst"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 5, 7], opacity: [0, 1, 0] }}
                  transition={{ duration: 0.9, ease: "easeOut", delay: 0.05 }}
                  className="pointer-events-none absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,203,0,0.85) 28%, rgba(255,106,0,0.55) 55%, rgba(255,106,0,0) 100%)",
                    filter: "blur(6px)",
                  }}
                />
              )}
            </AnimatePresence>

            {/* CONFETTI BURST */}
            <AnimatePresence>
              {stage === "burst" && (
                <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  {Array.from({ length: 22 }).map((_, i) => {
                    const angle = (i / 22) * Math.PI * 2;
                    const distance = 240 + (i % 4) * 50;
                    const colors = [
                      "bg-yellow",
                      "bg-magenta",
                      "bg-cyan",
                      "bg-lime",
                      "bg-orange",
                      "bg-purple",
                    ];
                    return (
                      <motion.span
                        key={i}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
                        animate={{
                          x: Math.cos(angle) * distance,
                          y: Math.sin(angle) * distance,
                          opacity: 0,
                          scale: 0.4,
                          rotate: 720,
                        }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className={`absolute block size-2 ${colors[i % colors.length]}`}
                      />
                    );
                  })}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* OPENING INDICATOR (visible only during closed stage) */}
          {stage === "closed" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="absolute bottom-12 flex flex-col items-center gap-2"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-yellow">
                Opening pack
              </span>
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="size-1.5 animate-pulse rounded-full bg-yellow"
                    style={{ animationDelay: `${i * 220}ms` }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
