"use client";

interface CigaretteEquivalentProps {
  daily?: number;
  weekly?: number;
  monthly?: number;
}

export function CigaretteEquivalent({
  daily = 5,
  weekly = 35,
  monthly = 150,
}: CigaretteEquivalentProps) {
  return (
    <div className="rounded-lg bg-slate-800/95 p-5 shadow-xl ring-1 ring-slate-700/60">
      <div className="flex items-start justify-between gap-4">
        {/* Left side - Daily equivalent */}
        <div className="flex items-start gap-3">
          <div>
            <p className="text-5xl font-bold text-red-500 leading-none">
              {daily}
            </p>
            <p className="mt-1.5 text-xs font-medium text-red-400">
              Cigarettes per day
            </p>
          </div>
          {/* Cigarette icon */}
          <div className="relative mt-2 flex-shrink-0">
            <svg
              width="28"
              height="36"
              viewBox="0 0 28 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              {/* Smoke trails */}
              <path
                d="M22 6 Q24 4 22 2 Q20 4 22 6"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                opacity="0.5"
              />
              <path
                d="M20 8 Q22 6 20 4 Q18 6 20 8"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                opacity="0.4"
              />
              <path
                d="M18 10 Q20 8 18 6 Q16 8 18 10"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                opacity="0.3"
              />
              {/* Cigarette body (white) */}
              <rect x="10" y="8" width="14" height="18" rx="2" fill="currentColor" />
              {/* Filter (brown) */}
              <rect x="10" y="22" width="14" height="10" rx="2" fill="#8B4513" />
            </svg>
          </div>
        </div>

        {/* Right side - Weekly and Monthly */}
        <div className="flex flex-col items-end gap-3 text-right">
          <div>
            <p className="text-xs text-slate-300">Weekly</p>
            <p className="mt-0.5 text-sm font-semibold text-red-500">
              {weekly} Cigarettes
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-300">Monthly</p>
            <p className="mt-0.5 text-sm font-semibold text-red-500">
              {monthly} Cigarettes
            </p>
          </div>
        </div>
      </div>

      {/* Main explanatory text */}
      <p className="mt-5 text-sm leading-relaxed text-slate-100">
        Breathing the air in this location is as harmful as smoking {daily}{" "}
        cigarettes a day.
      </p>

      {/* Source and Disclaimer */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-700/60 pt-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Source:</span>
          <a
            href="https://berkeleyearth.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-sky-400 hover:text-sky-300 transition"
          >
            Berkeley Earth
          </a>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-slate-500"
          >
            <circle
              cx="7"
              cy="7"
              r="6"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <text
              x="7"
              y="9.5"
              textAnchor="middle"
              fontSize="9"
              fill="currentColor"
              fontWeight="bold"
              className="font-bold"
            >
              i
            </text>
          </svg>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="mt-3 text-[10px] leading-relaxed text-slate-500">
        Disclaimer: This cigarette-equivalent estimate is based on the average
        PM2.5 concentration over the last 24 hours, assuming continuous exposure
        during that time.
      </p>
    </div>
  );
}
