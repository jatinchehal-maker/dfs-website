import Link from "next/link";

type Variant = "primary" | "secondary" | "inverted" | "ghostInverted";

const STYLES: Record<Variant, string> = {
  primary: "bg-black text-white hover:bg-neutral-800",
  secondary: "border-2 border-black text-black hover:bg-black hover:text-white",
  inverted: "bg-white text-black hover:bg-neutral-200",
  ghostInverted: "border-2 border-white text-white hover:bg-white hover:text-black",
};

type Props = { href: string; children: React.ReactNode; variant?: Variant; className?: string };

export default function ButtonLink({ href, children, variant = "primary", className = "" }: Props) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${STYLES[variant]} ${className}`;
  const isInternal = href.startsWith("/") || href.startsWith("#");
  const content = <>{children}<span aria-hidden="true">→</span></>;
  return isInternal ? <Link href={href} className={classes}>{content}</Link> : <a href={href} className={classes}>{content}</a>;
}
