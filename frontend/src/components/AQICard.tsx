type AQICardProps = {
  title: string;
  value: string;
  subtitle?: string;
  tone?: "default" | "success" | "warning";
};

const toneStyles: Record<
  NonNullable<AQICardProps["tone"]>,
  { ring: string; accent: string; subtitle: string }
> = {
  default: {
    ring: "ring-slate-700/70",
    accent: "text-slate-100",
    subtitle: "text-slate-400",
  },
  success: {
    ring: "ring-emerald-500/40",
    accent: "text-emerald-200",
    subtitle: "text-emerald-300/80",
  },
  warning: {
    ring: "ring-amber-400/40",
    accent: "text-amber-200",
    subtitle: "text-amber-200/80",
  },
};

export function AQICard({
  title,
  value,
  subtitle,
  tone = "default",
}: AQICardProps) {
  const styles = toneStyles[tone];

  return (
    <div
      className={`flex flex-col rounded-2xl bg-slate-950/60 p-4 text-xs shadow-lg shadow-slate-950/70 ring-1 ${styles.ring}`}
    >
      <span className="text-[11px] font-medium text-slate-400">{title}</span>
      <span className={`mt-2 text-2xl font-semibold ${styles.accent}`}>
        {value}
      </span>
      {subtitle && (
        <span className={`mt-1 text-[11px] leading-snug ${styles.subtitle}`}>
          {subtitle}
        </span>
      )}
    </div>
  );
}

