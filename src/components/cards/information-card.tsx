export const InformationCard = ({
  title,
  description,
  information,
}: {
  title: string;
  description: string;
  information: string[];
}) => {
  return (
    <div className="bg-ink-800/60 relative w-full overflow-hidden rounded-2xl border border-white/10 p-6 backdrop-blur-md transition hover:border-white/20 md:p-8">
      <div className="from-emerald-glow/30 via-white/5 to-azure-glow/30 pointer-events-none absolute -inset-px rounded-2xl bg-linear-to-br opacity-40 blur-sm" />

      <div className="relative">
        <div className="font-display text-xl italic text-white/95 md:text-2xl">{title}</div>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/55">{description}</p>

        <div className="mt-6 flex items-center gap-3">
          <div className="font-mono text-[10px] tracking-[0.3em] text-white/35">DETAILS</div>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <ul className="mt-4 grid grid-cols-1 gap-y-2.5 sm:grid-cols-2">
          {information.map((item, index) => (
            <li key={index} className="flex items-baseline gap-3">
              <span className="font-mono tabular text-[10px] text-white/30">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-sm leading-relaxed text-white/85">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
