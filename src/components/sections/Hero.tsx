import SculptureHero from "@/components/ui/liquid-sculpture-hero";
import { HERO } from "@/content/home";
import { HEADER } from "@/content/site";

const HEADING_FONT = "var(--font-big-shoulders), var(--font-archivo), sans-serif";
const BODY_FONT = "var(--font-archivo), sans-serif";

export default function Hero() {
  return (
    <SculptureHero
      src="/brand/logo-white.png"
      darkSrc="/brand/logo-white.png"
      mobileSrc="/brand/logo-white.png"
      mobileDarkSrc="/brand/logo-white.png"
      imageAlt={HEADER.logoAlt}
      showNav={false}
      themeToggle={false}
      theme="dark"
      background="#000000"
      darkBackground="#000000"
      textColor="#FFFFFF"
      accentColor="#FFFFFF"
      headingFont={HEADING_FONT}
      accentFont={HEADING_FONT}
      bodyFont={BODY_FONT}
      loadFonts={false}
      eyebrow="Laval · Montréal · Est. 2022"
      headline={"Delta Facilities\nSolutions"}
      headlineAccent=""
      body={HERO.body}
      primaryCta={HERO.primary}
      secondaryCta={HERO.secondary}
      hint={HERO.hint}
      hintTouch="Touch the logo"
      backdropText="DFS"
      sculptureScale={0.55}
      mobileSculptureScale={0.45}
      height="calc(100svh - 5rem)"
      className="uppercase-heading"
    />
  );
}
