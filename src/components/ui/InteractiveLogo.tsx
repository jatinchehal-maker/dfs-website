"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

const MAX_TILT_DEG = 8;

// DFS's own effect: a spotlight follows the cursor and lights up the logo, which tilts slightly.
// With reduced motion (or touch screens) the logo is simply shown fully lit.
export default function InteractiveLogo({ alt, hint }: { alt: string; hint: string }) {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduceMotion || !finePointer) {
      stage.dataset.static = "true";
      return;
    }

    let frame = 0;
    const handleMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        stage.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
        stage.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
        stage.style.setProperty("--ry", `${((px - 0.5) * 2 * MAX_TILT_DEG).toFixed(2)}deg`);
        stage.style.setProperty("--rx", `${((0.5 - py) * 2 * MAX_TILT_DEG).toFixed(2)}deg`);
        stage.style.setProperty("--spot", "1");
      });
    };
    const handleLeave = () => {
      cancelAnimationFrame(frame);
      stage.style.setProperty("--rx", "0deg");
      stage.style.setProperty("--ry", "0deg");
      stage.style.setProperty("--spot", "0");
    };

    stage.addEventListener("pointermove", handleMove, { passive: true });
    stage.addEventListener("pointerleave", handleLeave);
    return () => {
      cancelAnimationFrame(frame);
      stage.removeEventListener("pointermove", handleMove);
      stage.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <div ref={stageRef} className="logo-stage relative mx-auto w-full max-w-2xl">
      <div className="logo-tilt relative aspect-[400/329]">
        <Image src="/brand/logo-white.png" alt={alt} fill priority sizes="(min-width: 768px) 672px, 100vw" className="logo-base object-contain" />
        <Image src="/brand/logo-white.png" alt="" aria-hidden fill sizes="(min-width: 768px) 672px, 100vw" className="logo-lit object-contain" />
      </div>
      <p className="logo-hint mt-4 text-center text-xs uppercase tracking-[0.3em] text-neutral-500">{hint}</p>
    </div>
  );
}
