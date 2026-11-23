import Image from "next/image";
import { HEADER } from "@/content/site";

type Props = { inverted?: boolean; showName?: boolean };

export default function Logo({ inverted = false, showName = true }: Props) {
  return (
    <span className="flex items-center gap-3">
      <Image src={inverted ? "/brand/logo-white.png" : "/brand/logo-black.png"} alt={HEADER.logoAlt} width={52} height={43} priority />
      {showName && (
        <span className={`font-display text-lg font-bold uppercase leading-none tracking-tight ${inverted ? "text-white" : "text-black"}`}>
          Delta Facilities<br />Solutions
        </span>
      )}
    </span>
  );
}
