import Link from "next/link";
import { CigaretteEquivalent } from "@/components/CigaretteEquivalent";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-40 top-10 h-72 w-72 rounded-full bg-sky-500/30 blur-3xl" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-emerald-500/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-sky-400/20 blur-3xl" />
      </div>

      <header className="z-10 flex items-center justify-between px-6 py-5 sm:px-10">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/20 ring-1 ring-sky-400/40">
            <span className="text-lg font-semibold text-sky-200">CW</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
              CitizenWatch
            </span>
            <span className="text-xs text-slate-300">
              Pollution Intelligence Platform
            </span>
          </div>
        </div>

        <Link
          href="/dashboard"
          className="rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-sky-500/40 transition hover:bg-sky-400"
        >
          Open Dashboard
        </Link>
      </header>

      <section className="z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 pb-16 pt-4 sm:px-10 lg:flex-row lg:items-stretch lg:gap-16">
        <div className="max-w-xl space-y-6 text-center lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full bg-slate-900/50 px-3 py-1 text-xs font-medium text-sky-200 ring-1 ring-sky-400/30 backdrop-blur">
            AI for construction & urban air quality
          </p>

          <h1 className="text-balance text-4xl font-semibold leading-tight text-slate-50 sm:text-5xl lg:text-6xl">
            Air Pollution Needs{" "}
            <span className="bg-gradient-to-r from-sky-300 to-emerald-300 bg-clip-text text-transparent">
              Predictive Intelligence
            </span>
          </h1>

          <p className="text-balance text-sm leading-relaxed text-slate-200/80 sm:text-base">
            CitizenWatch combines real-time air quality data with AI-powered
            forecasting to predict construction-driven AQI spikes before they
            happen—so cities, contractors, and communities can act early.
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-start">
            <Link
              href="/dashboard"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/40 transition hover:bg-sky-400 sm:w-auto"
            >
              Go to Dashboard
            </Link>
            <a
              href="#learn-more"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-sky-400/40 bg-slate-900/40 px-6 py-3 text-sm font-medium text-slate-100/90 backdrop-blur transition hover:border-sky-300 hover:bg-slate-900/70 sm:w-auto"
            >
              Learn More
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-slate-300/90 sm:justify-start">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/50 px-3 py-1 ring-1 ring-emerald-400/30">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Live AQI feeds
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/40 px-3 py-1 ring-1 ring-sky-400/25">
              <span className="h-2 w-2 rounded-full bg-sky-300" />
              Smart risk scoring
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/40 px-3 py-1 ring-1 ring-emerald-300/25">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              Project-level insights
            </span>
          </div>
        </div>

        <div className="mt-10 w-full max-w-md space-y-4 lg:mt-0 lg:max-w-none">
          {/* Cigarette Equivalent Block */}
          <CigaretteEquivalent daily={5} weekly={35} monthly={150} />

          <div className="relative mx-auto w-full max-w-md rounded-3xl bg-slate-900/70 p-5 shadow-2xl shadow-sky-900/40 ring-1 ring-sky-500/40 backdrop-blur sm:p-6 lg:max-w-sm">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                Today&apos;s Snapshot
              </p>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-300 ring-1 ring-emerald-400/50">
                City-wide AQI Outlook
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-2xl bg-slate-900/80 p-4 ring-1 ring-sky-400/30">
                <p className="text-xs text-slate-400">Average AQI</p>
                <p className="mt-2 text-2xl font-semibold text-slate-50">74</p>
                <p className="mt-1 text-[11px] text-emerald-300">
                  Stable · within safe range
                </p>
              </div>
              <div className="rounded-2xl bg-slate-900/80 p-4 ring-1 ring-emerald-400/30">
                <p className="text-xs text-slate-400">Construction Risk</p>
                <p className="mt-2 text-2xl font-semibold text-amber-300">
                  Moderate
                </p>
                <p className="mt-1 text-[11px] text-amber-200/90">
                  36% chance of local spikes
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3 rounded-2xl bg-slate-950/70 p-4 ring-1 ring-slate-700/60">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Next 72h AQI band</span>
                <span className="text-[11px] text-slate-400">
                  AI-powered forecast
                </span>
              </div>
              <div className="h-20 rounded-xl bg-gradient-to-r from-emerald-400/20 via-sky-400/30 to-amber-300/25 p-1">
                <div className="flex h-full items-end justify-between gap-1 rounded-lg bg-slate-950/60 px-2 pb-1 pt-2">
                  <div className="flex-1 rounded-sm bg-emerald-400/70" style={{ height: "40%" }} />
                  <div className="flex-1 rounded-sm bg-emerald-300/70" style={{ height: "55%" }} />
                  <div className="flex-1 rounded-sm bg-sky-300/80" style={{ height: "65%" }} />
                  <div className="flex-1 rounded-sm bg-sky-400/80" style={{ height: "75%" }} />
                  <div className="flex-1 rounded-sm bg-amber-300/80" style={{ height: "82%" }} />
                  <div className="flex-1 rounded-sm bg-amber-400/80" style={{ height: "70%" }} />
                </div>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-300/90">
                CitizenWatch models combine met data, emissions baselines, and
                construction schedules to surface AQI risks before permits are
                approved.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="learn-more"
        className="z-10 border-t border-slate-800/60 bg-slate-950/40 px-6 py-10 backdrop-blur sm:px-10"
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">
              Why CitizenWatch
            </h2>
            <p className="text-balance text-lg font-medium text-slate-50">
              A control tower for construction-driven air quality.
            </p>
            <p className="text-sm text-slate-300/90">
              Bring together environmental teams, city agencies, and
              contractors on a single source of truth for AQI risk.
            </p>
          </div>

          <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-900/60 p-4 shadow-lg shadow-sky-950/60 ring-1 ring-sky-500/30">
              <h3 className="text-sm font-semibold text-sky-100">
                Real-time monitoring
              </h3>
              <p className="mt-2 text-xs text-slate-300/90">
                Ingest live AQI feeds and on-site sensor data for
                minute-by-minute visibility into air quality.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-900/60 p-4 shadow-lg shadow-emerald-950/60 ring-1 ring-emerald-500/30">
              <h3 className="text-sm font-semibold text-emerald-100">
                Construction AQI prediction
              </h3>
              <p className="mt-2 text-xs text-slate-300/90">
                Simulate project impact using land area, height, schedule, and
                weather to forecast AQI deltas.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-900/60 p-4 shadow-lg shadow-slate-950/60 ring-1 ring-slate-500/30">
              <h3 className="text-sm font-semibold text-slate-100">
                Data-driven insights
              </h3>
              <p className="mt-2 text-xs text-slate-300/90">
                Translate complex models into clear risk bands and mitigation
                recommendations stakeholders can act on.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="z-10 border-t border-slate-800/60 bg-slate-950/80 px-6 py-5 text-xs text-slate-400 sm:px-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p>© {new Date().getFullYear()} CitizenWatch. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-500">
              AI-powered Pollution Intelligence Platform
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
