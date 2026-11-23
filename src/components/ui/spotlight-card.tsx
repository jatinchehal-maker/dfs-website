"use client";
/**
 * Spotlight Card — adapted from "spotlight-card" by easemize (21st.dev).
 * Changes for DFS: a neutral "mono" glow tuned for white backgrounds, no
 * coloured hues, no effect on touch screens or with prefers-reduced-motion.
 */
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type GlowTone = "mono" | "blue" | "purple" | "green" | "red" | "orange";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: GlowTone;
  /** spotlight radius in px */
  size?: number;
}

const HUES: Record<Exclude<GlowTone, "mono">, { base: number; spread: number }> = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
};

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

const GLOW_CSS = `
[data-glow]{--border-size:calc(var(--border,2)*1px);--spotlight-size:calc(var(--size,200)*1px);
  --hue:calc(var(--base) + (var(--xp,0)*var(--spread,0)));
  background-image:radial-gradient(var(--spotlight-size) var(--spotlight-size) at calc(var(--x,-999)*1px) calc(var(--y,-999)*1px),
    hsl(var(--hue,0) calc(var(--saturation,0)*1%) calc(var(--lightness,0)*1%) / var(--bg-spot-opacity,.06)),transparent);
  background-attachment:fixed;background-size:calc(100% + 2*var(--border-size)) calc(100% + 2*var(--border-size));background-position:50% 50%}
[data-glow]::before,[data-glow]::after{pointer-events:none;content:"";position:absolute;inset:calc(var(--border-size)*-1);
  border:var(--border-size) solid transparent;border-radius:calc(var(--radius)*1px);background-attachment:fixed;
  background-size:calc(100% + 2*var(--border-size)) calc(100% + 2*var(--border-size));background-repeat:no-repeat;background-position:50% 50%;
  mask:linear-gradient(transparent,transparent),linear-gradient(white,white);mask-clip:padding-box,border-box;mask-composite:intersect}
[data-glow]::before{background-image:radial-gradient(calc(var(--spotlight-size)*.75) calc(var(--spotlight-size)*.75) at calc(var(--x,-999)*1px) calc(var(--y,-999)*1px),
  hsl(var(--hue,0) calc(var(--saturation,0)*1%) calc(var(--lightness,0)*1%) / var(--border-spot-opacity,.9)),transparent 100%)}
[data-glow]::after{background-image:radial-gradient(calc(var(--spotlight-size)*.5) calc(var(--spotlight-size)*.5) at calc(var(--x,-999)*1px) calc(var(--y,-999)*1px),
  hsl(0 0% 100% / var(--border-light-opacity,0)),transparent 100%)}
[data-glow] > [data-glow]{position:absolute;inset:0;opacity:var(--outer,1);border-radius:calc(var(--radius)*1px);
  filter:blur(calc(var(--border-size)*8));background:none;pointer-events:none;border:none}
[data-glow] > [data-glow]::before{inset:-10px;border-width:10px}
[data-glow][data-static="true"],[data-glow][data-static="true"]::before,[data-glow][data-static="true"]::after{background-image:none}
`;

export function GlowCard({ children, className = "", glowColor = "mono", size = 220 }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const fine = window.matchMedia(FINE_POINTER);
    const reduced = window.matchMedia(REDUCED_MOTION);
    const sync = (e: PointerEvent) => {
      card.style.setProperty("--x", e.clientX.toFixed(2));
      card.style.setProperty("--y", e.clientY.toFixed(2));
      card.style.setProperty("--xp", (e.clientX / window.innerWidth).toFixed(2));
    };
    const apply = () => {
      const enabled = fine.matches && !reduced.matches;
      card.dataset.static = String(!enabled);
      document.removeEventListener("pointermove", sync);
      if (enabled) document.addEventListener("pointermove", sync, { passive: true });
    };
    apply();
    fine.addEventListener("change", apply);
    reduced.addEventListener("change", apply);
    return () => {
      document.removeEventListener("pointermove", sync);
      fine.removeEventListener("change", apply);
      reduced.removeEventListener("change", apply);
    };
  }, []);

  const hue = glowColor === "mono" ? { base: 0, spread: 0 } : HUES[glowColor];
  const tone =
    glowColor === "mono"
      ? { "--saturation": 0, "--lightness": 0, "--bg-spot-opacity": 0.06, "--border-spot-opacity": 0.85, "--border-light-opacity": 0 }
      : { "--saturation": 100, "--lightness": 50, "--bg-spot-opacity": 0.1, "--border-spot-opacity": 1, "--border-light-opacity": 1 };

  const style = {
    "--base": hue.base, "--spread": hue.spread, "--radius": 16, "--border": 2, "--size": size,
    ...tone,
    backgroundColor: "#fff",
    border: "var(--border-size) solid #000",
    position: "relative",
  } as CSSProperties;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOW_CSS }} />
      <div ref={cardRef} data-glow data-static="true" style={style} className={`rounded-2xl ${className}`}>
        <div data-glow aria-hidden="true" />
        {children}
      </div>
    </>
  );
}
