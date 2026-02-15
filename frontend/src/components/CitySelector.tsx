"use client";

import { useState, useCallback } from "react";

const API_URL =
  `${process.env.NEXT_PUBLIC_API_URL}/predict-aqi-impact`;

const CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Thane",
  "Bhopal",
];

export function CitySelector() {
  const [selectedCity, setSelectedCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ===============================
  // SEND CITY → GENERATE PREDICTION
  // ===============================
  const generatePrediction = useCallback(async (city: string) => {
    if (!city.trim()) return;

    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city: city.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        const detail =
          (data as { detail?: string }).detail ??
          "Prediction failed";
        throw new Error(detail);
      }

      console.log("Prediction:", data);

      setMessage(`Prediction generated for ${city}`);

      // refresh dashboard data
      window.location.reload();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Prediction failed"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ===============================
  // HANDLE SELECT CHANGE
  // ===============================
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCity(value);
    setMessage(null);
    setError(null);

    if (value) {
      generatePrediction(value);
    }
  };

  return (
    <div
      id="construction"
      className="space-y-4 rounded-2xl bg-slate-950/70 p-4 text-xs shadow-xl shadow-sky-950/60 ring-1 ring-sky-600/40 md:p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300">
            Select City
          </p>
          <p className="mt-1 text-xs text-slate-300">
            Choose a city to generate an AI-powered AQI prediction.
          </p>
        </div>

        <span className="rounded-full bg-sky-500/10 px-3 py-1 text-[11px] font-medium text-sky-200 ring-1 ring-sky-400/40">
          AI Prediction
        </span>
      </div>

      {/* SELECT */}
      <div className="space-y-2">
        <label
          htmlFor="city-select"
          className="block text-[11px] font-medium text-slate-300"
        >
          City
        </label>

        <select
          id="city-select"
          value={selectedCity}
          onChange={handleChange}
          disabled={isLoading}
          className="h-10 w-full rounded-lg border border-slate-700/70 bg-slate-900/70 px-3 text-xs text-slate-50 outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">Choose a city...</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* LOADING */}
      {isLoading && (
        <p className="flex items-center gap-2 text-[11px] text-slate-400">
          <span className="h-3 w-3 animate-spin rounded-full border-[2px] border-slate-500 border-t-transparent" />
          Generating prediction...
        </p>
      )}

      {/* SUCCESS */}
      {message && (
        <div className="rounded-xl bg-emerald-950/40 p-3 text-[11px] text-emerald-200 ring-1 ring-emerald-400/40">
          ✓ {message}
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="rounded-xl bg-amber-950/40 p-3 text-[11px] text-amber-200 ring-1 ring-amber-400/40">
          <p className="font-medium">Error:</p>
          <p className="mt-1">{error}</p>
        </div>
      )}
    </div>
  );
}
