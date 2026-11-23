import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

/**
 * Notched card: rounded photo with a notch cut into its bottom-right corner
 * that holds a round arrow button. The notch is "cut" by painting the colour
 * of the section behind the card, so pass `surface` when the section isn't white.
 * The whole card is one link, so the arrow, photo and title all open the page.
 */
type Props = {
  href: string;
  image: string;
  title: string;
  meta?: string;
  body?: string;
  badge?: string;
  tags?: string[];
  /** Background colour of the section the card sits on. */
  surface?: string;
  /** Grayscale photo that turns to colour on hover. */
  monochrome?: boolean;
};

const RADIUS = 24; // px: photo corners and notch curves
const NOTCH = 72; // px: size of the notch square

export default function ImageCard({ href, image, title, meta, body, badge, tags, surface = "#ffffff", monochrome = true }: Props) {
  const vars = { "--surface": surface, "--r": `${RADIUS}px`, "--notch": `${NOTCH}px` } as CSSProperties;
  return (
    <Link href={href} style={vars} className="group flex flex-col rounded-[28px] outline-offset-4 focus-visible:outline-2 focus-visible:outline-black">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--r)]">
        <Image
          src={image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={`object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${monochrome ? "grayscale group-hover:grayscale-0 group-focus-visible:grayscale-0" : ""}`}
        />
        {badge && <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">{badge}</span>}

        {/* the notch: a block of surface colour plus two inverse curves that round its joins with the photo */}
        <span aria-hidden="true" className="absolute bottom-0 right-0 h-[var(--notch)] w-[var(--notch)] rounded-tl-[var(--r)] bg-[var(--surface)]" />
        <span aria-hidden="true" className="notch-curve absolute bottom-[var(--notch)] right-0 h-[var(--r)] w-[var(--r)]" />
        <span aria-hidden="true" className="notch-curve absolute bottom-0 right-[var(--notch)] h-[var(--r)] w-[var(--r)]" />

        <span
          aria-hidden="true"
          className="absolute bottom-1.5 right-1.5 grid h-[calc(var(--notch)-12px)] w-[calc(var(--notch)-12px)] place-items-center rounded-full bg-neutral-200 text-black transition-colors duration-300 group-hover:bg-black group-hover:text-white group-focus-visible:bg-black group-focus-visible:text-white motion-reduce:transition-none"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </span>
      </div>

      <div className="flex flex-1 flex-col pr-2 pt-5">
        {meta && <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">{meta}</p>}
        <h3 className="mt-2 text-xl font-semibold leading-snug decoration-2 underline-offset-4 group-hover:underline">{title}</h3>
        {body && <p className="mt-2 text-sm text-neutral-600">{body}</p>}
        {tags && tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => <li key={tag} className="rounded-full border border-black px-3 py-1 text-xs font-medium">{tag}</li>)}
          </ul>
        )}
      </div>
    </Link>
  );
}
