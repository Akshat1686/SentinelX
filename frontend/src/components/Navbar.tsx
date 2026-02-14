import Link from "next/link";

export function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800/80 bg-slate-950/70 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500/20 ring-1 ring-sky-400/40">
          <span className="text-xs font-semibold text-sky-200">CW</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
            CitizenWatch
          </span>
          <span className="text-[11px] text-slate-400">
            Pollution Intelligence
          </span>
        </div>
      </div>

      <nav className="flex items-center gap-4 text-xs text-slate-300">
        <Link
          href="/"
          className="rounded-full px-3 py-1 text-[11px] font-medium text-slate-300 transition hover:bg-slate-800/70 hover:text-slate-50"
        >
          Landing
        </Link>
        <Link
          href="/dashboard"
          className="rounded-full px-3 py-1 text-[11px] font-medium text-slate-300 transition hover:bg-slate-800/70 hover:text-slate-50"
        >
          Dashboard
        </Link>
        <Link
          href="/upload"
          className="rounded-full px-3 py-1 text-[11px] font-medium text-slate-300 transition hover:bg-slate-800/70 hover:text-slate-50"
        >
          Video Upload
        </Link>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-200 ring-1 ring-emerald-400/40">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Live AQI · Beta
        </span>
      </nav>
    </header>
  );
}

