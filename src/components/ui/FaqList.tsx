type Props = { items: { q: string; a: string }[] };

export default function FaqList({ items }: Props) {
  return (
    <div className="divide-y-2 divide-black rounded-2xl border-2 border-black bg-white">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold">
            {item.q}
            <span className="text-2xl transition-transform group-open:rotate-45" aria-hidden="true">+</span>
          </summary>
          <p className="px-5 pb-5 text-neutral-700">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
