"use client";

import { useState, FormEvent, ChangeEvent, useEffect } from "react";

const UPLOAD_API = "http://localhost:8000/upload";
const STATS_API = "http://localhost:8000/stats";

interface UploadResponse {
  message: string;
  total_uploads: number;
  successful_uploads: number;
  video_url: string;
}

interface StatsResponse {
  total_uploads: number;
  smoke_detected: number;
  failed_uploads: number;
}

export function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [uploadStats, setUploadStats] = useState<{
    total_uploads: number;
    successful_uploads: number;
  } | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Statistics state
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  // Fetch statistics from backend
  const fetchStats = async () => {
    setIsLoadingStats(true);
    setStatsError(null);
    try {
      const response = await fetch(STATS_API);
      if (!response.ok) {
        throw new Error("Failed to fetch statistics");
      }
      const data: StatsResponse = await response.json();
      setStats(data);
    } catch (err) {
      setStatsError(
        err instanceof Error ? err.message : "Failed to load statistics"
      );
    } finally {
      setIsLoadingStats(false);
    }
  };

  // Fetch stats on component mount
  useEffect(() => {
    fetchStats();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("video/")) {
        setError("Please select a video file");
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError(null);
      setUploadStatus(null);
      setVideoUrl(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a video file");
      return;
    }

    setIsLoading(true);
    setError(null);
    setUploadStatus(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(UPLOAD_API, {
        method: "POST",
        body: formData,
      });

      const data: UploadResponse = await response.json();

      if (!response.ok) {
        const detail = (data as { detail?: string | string[] }).detail;
        const msg =
          typeof detail === "string"
            ? detail
            : Array.isArray(detail)
              ? detail.map((d) => (typeof d === "object" && d && "msg" in d ? (d as { msg: string }).msg : String(d))).join(", ")
              : (data as { message?: string }).message ?? "Upload failed";
        throw new Error(msg);
      }

      setUploadStatus(data.message);
      setUploadStats({
        total_uploads: data.total_uploads,
        successful_uploads: data.successful_uploads,
      });
      setVideoUrl(data.video_url);

      // Refresh statistics after successful upload
      await fetchStats();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to upload video"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 rounded-2xl bg-slate-950/70 p-4 text-xs shadow-xl shadow-sky-950/60 ring-1 ring-sky-600/40 md:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300">
            Video Upload
          </p>
          <p className="mt-1 text-xs text-slate-300">
            Upload videos to Cloudinary and store metadata in MongoDB via
            FastAPI.
          </p>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-200 ring-1 ring-emerald-400/40">
          Cloudinary + MongoDB
        </span>
      </div>

      {/* Statistics Dashboard */}
      <div className="rounded-xl bg-slate-950/80 p-4 ring-1 ring-slate-800/80">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          Upload Statistics
        </p>
        {isLoadingStats ? (
          <div className="flex items-center justify-center py-8">
            <span className="h-4 w-4 animate-spin rounded-full border-[2px] border-slate-500 border-t-transparent" />
            <span className="ml-2 text-[11px] text-slate-400">
              Loading statistics...
            </span>
          </div>
        ) : statsError ? (
          <div className="rounded-lg bg-amber-950/40 p-3 text-[11px] text-amber-200 ring-1 ring-amber-400/40">
            <p className="font-medium">Error loading statistics:</p>
            <p className="mt-1">{statsError}</p>
          </div>
        ) : stats ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-slate-900/60 p-4 shadow-lg ring-1 ring-slate-700/50">
              <p className="text-2xl font-bold text-slate-50">
                {stats.total_uploads}
              </p>
              <p className="mt-1 text-[11px] font-medium text-slate-400">
                Total Video Uploads
              </p>
            </div>
            <div className="rounded-lg bg-emerald-950/40 p-4 shadow-lg ring-1 ring-emerald-500/30">
              <p className="text-2xl font-bold text-emerald-300">
                {stats.smoke_detected}
              </p>
              <p className="mt-1 text-[11px] font-medium text-emerald-200/80">
                Successfully Smoke Detected
              </p>
            </div>
            <div className="rounded-lg bg-amber-950/40 p-4 shadow-lg ring-1 ring-amber-500/30">
              <p className="text-2xl font-bold text-amber-300">
                {stats.failed_uploads}
              </p>
              <p className="mt-1 text-[11px] font-medium text-amber-200/80">
                Unsuccessful Uploads
              </p>
            </div>
          </div>
        ) : null}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="video"
            className="block text-[11px] font-medium text-slate-300"
          >
            Select Video File
          </label>
          <input
            id="video"
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            disabled={isLoading}
            className="block w-full text-xs text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-sky-500/20 file:px-3 file:py-2 file:text-xs file:font-medium file:text-sky-200 file:ring-1 file:ring-sky-400/40 hover:file:bg-sky-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {file && (
            <p className="text-[11px] text-slate-400">
              Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!file || isLoading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold text-slate-950 shadow-lg shadow-sky-500/40 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:shadow-none md:w-auto"
        >
          {isLoading ? (
            <>
              <span className="h-3 w-3 animate-spin rounded-full border-[2px] border-slate-900 border-t-transparent" />
              Uploading...
            </>
          ) : (
            <>Upload Video</>
          )}
        </button>
      </form>

      {error && (
        <div className="rounded-xl bg-amber-950/40 p-3 text-[11px] text-amber-200 ring-1 ring-amber-400/40">
          <p className="font-medium">Error:</p>
          <p className="mt-1">{error}</p>
        </div>
      )}

      {uploadStatus && (
        <div className="space-y-3">
          <div className="rounded-xl bg-emerald-950/40 p-3 text-[11px] text-emerald-200 ring-1 ring-emerald-400/40">
            <p className="font-medium">✓ {uploadStatus}</p>
          </div>

          {uploadStats && (
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-950/80 p-3 ring-1 ring-slate-800/80">
                <p className="text-[11px] font-medium text-slate-300">
                  Total Uploads
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-50">
                  {uploadStats.total_uploads}
                </p>
              </div>
              <div className="rounded-xl bg-slate-950/80 p-3 ring-1 ring-slate-800/80">
                <p className="text-[11px] font-medium text-slate-300">
                  Successful
                </p>
                <p className="mt-1 text-lg font-semibold text-emerald-300">
                  {uploadStats.successful_uploads}
                </p>
              </div>
            </div>
          )}

          {videoUrl && (
            <div className="space-y-2">
              <p className="text-[11px] font-medium text-slate-300">
                Video Preview
              </p>
              <div className="rounded-xl bg-slate-950/80 p-2 ring-1 ring-slate-800/80">
                <video
                  src={videoUrl}
                  controls
                  className="w-full rounded-lg"
                  style={{ maxHeight: "400px" }}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="text-[10px] text-slate-400">
                Video URL:{" "}
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-300 hover:text-sky-200 underline break-all"
                >
                  {videoUrl}
                </a>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
