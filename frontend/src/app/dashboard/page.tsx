import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { AQICard } from "@/components/AQICard";
import { CitySelector } from "@/components/CitySelector";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 space-y-4 bg-slate-950/40 px-4 py-4 text-xs text-slate-100 sm:px-6 lg:px-8">
          <section className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-300">
                Overview
              </p>
              <h1 className="mt-1 text-lg font-semibold text-slate-50 sm:text-xl">
                City-wide AQI & construction risk
              </h1>
              <p className="mt-1 text-[11px] text-slate-400">
                Monitor live conditions, predict project-driven spikes, and
                quantify environmental impact.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1.5 text-[11px] text-slate-300 ring-1 ring-slate-700/60">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Backend</span>
              <code className="rounded bg-slate-950/80 px-1.5 py-0.5 text-[10px] text-sky-200">
                http://localhost:8000/city
              </code>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <AQICard
              title="Average AQI (today)"
              value="74"
              subtitle="City baseline from live sensors"
            />
            <AQICard
              title="Predicted AQI risk"
              value="Moderate"
              subtitle="36% chance of local exceedances"
              tone="warning"
            />
            <AQICard
              title="Total predictions (this week)"
              value="128"
              subtitle="Projects evaluated across all districts"
              tone="success"
            />
          </section>

          <section className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)]">
            <div className="space-y-3 rounded-2xl bg-slate-950/70 p-4 shadow-xl shadow-sky-950/60 ring-1 ring-slate-800/80">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-medium text-slate-300">
                  AQI trends (placeholder)
                </p>
                <span className="rounded-full bg-slate-900/70 px-2 py-0.5 text-[10px] text-slate-400 ring-1 ring-slate-700/70">
                  Line chart · coming soon
                </span>
              </div>
              <div className="flex h-40 items-end justify-between gap-1 rounded-xl border border-dashed border-slate-700/70 bg-slate-950/80 px-3 pb-3 pt-4 text-[10px] text-slate-400 sm:h-44">
                <div className="flex h-full w-full items-end gap-1">
                  {[40, 55, 62, 70, 82, 68, 60, 72, 78, 65, 58, 62].map(
                    (height, index) => (
                      <div
                        key={index}
                        className="flex-1 rounded-sm bg-gradient-to-t from-sky-500/40 via-emerald-400/60 to-emerald-200/80"
                        style={{ height: `${height}%` }}
                      />
                    )
                  )}
                </div>
              </div>
              <p className="text-[11px] text-slate-400">
                Visualize AQI movement across the last 24–72 hours and compare
                it against construction schedules and permit windows.
              </p>
            </div>

            <CitySelector />
          </section>

          <section
            id="history"
            className="mt-2 rounded-2xl bg-slate-950/60 p-4 text-[11px] shadow-inner shadow-slate-950/80 ring-1 ring-slate-800/80"
          >
            <div className="flex items-center justify-between">
              <p className="font-medium text-slate-200">Past predictions</p>
              <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] text-slate-400">
                Historical view · placeholder
              </span>
            </div>
            <p className="mt-2 text-slate-400">
              Once the backend is connected, this space will surface recent
              prediction runs, projects with elevated risk, and mitigation
              actions taken.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}

