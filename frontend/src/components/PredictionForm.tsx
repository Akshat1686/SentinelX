"use client";

import { FormEvent, useState } from "react";

type PredictionResponse = {
  predicted_increase?: number;
  risk_level?: string;
  [key: string]: unknown;
};

const API_URL = "http://localhost:8000/predict";

export function PredictionForm() {
  const [landArea, setLandArea] = useState("");
  const [buildingHeight, setBuildingHeight] = useState("");
  const [duration, setDuration] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [humidity, setHumidity] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResponse | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = {
        land_area: Number(landArea),
        building_height: Number(buildingHeight),
        duration_days: Number(duration),
        wind_speed: Number(windSpeed),
        humidity: Number(humidity),
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Prediction service is unavailable. Try again soon.");
      }

      const data: PredictionResponse = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to reach the prediction API. Ensure the backend is running on port 8000."
      );
    } finally {
      setIsLoading(false);
    }
  }

  const formattedIncrease =
    result?.predicted_increase !== undefined
      ? `${result.predicted_increase.toFixed?.(1) ?? result.predicted_increase} AQI`
      : "—";

  const riskLabel = result?.risk_level ?? "Pending";

  let riskTone: "success" | "warning" | "default" = "default";
  if (typeof riskLabel === "string") {
    const normalized = riskLabel.toLowerCase();
    if (normalized.includes("low")) riskTone = "success";
    else if (normalized.includes("med") || normalized.includes("high")) {
      riskTone = "warning";
    }
  }

  return (
    <div
      id="construction"
      className="space-y-4 rounded-2xl bg-slate-950/70 p-4 text-xs shadow-xl shadow-sky-950/60 ring-1 ring-sky-600/40 md:p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300">
            Construction Predictor
          </p>
          <p className="mt-1 text-xs text-slate-300">
            Estimate project-driven AQI increase based on site footprint and
            weather.
          </p>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-200 ring-1 ring-emerald-400/40">
          Uses POST /predict
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-2"
      >
        <div className="space-y-1">
          <label
            htmlFor="landArea"
            className="text-[11px] font-medium text-slate-300"
          >
            Land Area (m²)
          </label>
          <input
            id="landArea"
            type="number"
            min="0"
            required
            value={landArea}
            onChange={(e) => setLandArea(e.target.value)}
            className="h-9 w-full rounded-lg border border-slate-700/70 bg-slate-900/70 px-2 text-xs text-slate-50 outline-none ring-0 transition placeholder:text-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            placeholder="e.g. 12000"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor="buildingHeight"
            className="text-[11px] font-medium text-slate-300"
          >
            Building Height (m)
          </label>
          <input
            id="buildingHeight"
            type="number"
            min="0"
            required
            value={buildingHeight}
            onChange={(e) => setBuildingHeight(e.target.value)}
            className="h-9 w-full rounded-lg border border-slate-700/70 bg-slate-900/70 px-2 text-xs text-slate-50 outline-none ring-0 transition placeholder:text-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            placeholder="e.g. 45"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor="duration"
            className="text-[11px] font-medium text-slate-300"
          >
            Duration (days)
          </label>
          <input
            id="duration"
            type="number"
            min="0"
            required
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="h-9 w-full rounded-lg border border-slate-700/70 bg-slate-900/70 px-2 text-xs text-slate-50 outline-none ring-0 transition placeholder:text-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            placeholder="e.g. 180"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor="windSpeed"
            className="text-[11px] font-medium text-slate-300"
          >
            Wind Speed (m/s)
          </label>
          <input
            id="windSpeed"
            type="number"
            min="0"
            required
            value={windSpeed}
            onChange={(e) => setWindSpeed(e.target.value)}
            className="h-9 w-full rounded-lg border border-slate-700/70 bg-slate-900/70 px-2 text-xs text-slate-50 outline-none ring-0 transition placeholder:text-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            placeholder="e.g. 3.4"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor="humidity"
            className="text-[11px] font-medium text-slate-300"
          >
            Humidity (%)
          </label>
          <input
            id="humidity"
            type="number"
            min="0"
            max="100"
            required
            value={humidity}
            onChange={(e) => setHumidity(e.target.value)}
            className="h-9 w-full rounded-lg border border-slate-700/70 bg-slate-900/70 px-2 text-xs text-slate-50 outline-none ring-0 transition placeholder:text-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            placeholder="e.g. 62"
          />
        </div>

        <div className="flex items-end justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold text-slate-950 shadow-lg shadow-sky-500/40 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:shadow-none md:w-auto"
          >
            {isLoading ? (
              <>
                <span className="h-3 w-3 animate-spin rounded-full border-[2px] border-slate-900 border-t-transparent" />
                Calculating…
              </>
            ) : (
              <>Submit Prediction</>
            )}
          </button>
        </div>
      </form>

      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-[1.1fr,0.9fr]">
        <div className="rounded-2xl bg-slate-950/80 p-3 ring-1 ring-slate-800/80">
          <p className="text-[11px] font-medium text-slate-300">
            Predicted AQI Increase
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-50">
            {result ? formattedIncrease : "Awaiting input"}
          </p>
          <p className="mt-1 text-[11px] text-slate-400">
            This represents the estimated delta over baseline AQI for the
            project&apos;s active phase.
          </p>
        </div>

        <div className="flex flex-col justify-between gap-2 rounded-2xl bg-slate-950/80 p-3 ring-1 ring-slate-800/80">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-slate-300">
              Risk Level
            </p>
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                riskTone === "success"
                  ? "bg-emerald-500/10 text-emerald-200 ring-1 ring-emerald-400/50"
                  : riskTone === "warning"
                  ? "bg-amber-400/10 text-amber-200 ring-1 ring-amber-400/50"
                  : "bg-slate-700/40 text-slate-100 ring-1 ring-slate-500/60"
              }`}
            >
              {riskLabel}
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Use this as an early signal for permit reviews, mitigation planning,
            and community notifications.
          </p>
        </div>
      </div>

      {error && (
        <p className="mt-1 text-[11px] font-medium text-amber-300">
          {error}
        </p>
      )}
    </div>
  );
}

