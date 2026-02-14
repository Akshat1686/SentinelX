"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard#construction", label: "Select City" },
  { href: "/dashboard#history", label: "Past Predictions" },
  { href: "/upload", label: "Video Upload" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-56 flex-col border-r border-slate-800/80 bg-slate-950/60 px-3 py-4 text-xs text-slate-300 backdrop-blur sm:flex">
      <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
        Dashboard
      </p>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : item.href === "/upload"
                ? pathname === "/upload"
                : false;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center justify-between rounded-xl px-3 py-2 text-xs transition ${
                isActive
                  ? "bg-sky-500/15 text-sky-100 ring-1 ring-sky-400/50"
                  : "text-slate-300 hover:bg-slate-900/70 hover:text-slate-50"
              }`}
            >
              <span>{item.label}</span>
              {item.label === "Video Upload" && (
                <span className="rounded-full bg-sky-500/15 px-2 py-0.5 text-[10px] font-medium text-sky-300 group-hover:bg-sky-500/25">
                  Cloud
                </span>
              )}
              {item.label === "Select City" && (
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300 group-hover:bg-emerald-500/25">
                  Backend
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-2 rounded-2xl bg-slate-900/60 p-3 text-[11px] ring-1 ring-slate-700/70">
        <p className="font-medium text-slate-200">Environment profile</p>
        <p className="text-slate-400">City-wide monitoring · v0.1</p>
        <p className="text-[10px] text-slate-500">
          Connect more sensors and projects as you scale adoption across
          agencies.
        </p>
      </div>
    </aside>
  );
}
