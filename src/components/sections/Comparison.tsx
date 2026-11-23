import Section from "@/components/ui/Section";
import { COMPARISON } from "@/content/home";

export default function Comparison() {
  return (
    <Section title={COMPARISON.title} tone="muted" center>
      <div className="mx-auto max-w-4xl overflow-x-auto rounded-2xl border-2 border-black bg-white text-left">
        <table className="w-full min-w-[520px] text-sm">
          <thead>
            <tr className="border-b-2 border-black">
              <th scope="col" className="p-4"><span className="sr-only">Compared item</span></th>
              <th scope="col" className="p-4 font-medium text-neutral-500">{COMPARISON.them}</th>
              <th scope="col" className="font-display bg-black p-4 text-xl font-bold uppercase text-white">DFS</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.rows.map((r) => (
              <tr key={r.label} className="border-b border-neutral-200 last:border-0">
                <th scope="row" className="p-4 font-semibold">{r.label}</th>
                <td className="p-4 text-neutral-500">{r.them}</td>
                <td className="bg-neutral-50 p-4 font-semibold"><span aria-hidden="true">✓ </span>{r.us}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
