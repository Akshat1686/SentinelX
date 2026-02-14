import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { VideoUpload } from "@/components/VideoUpload";

export default function UploadPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 space-y-4 bg-slate-950/40 px-4 py-4 text-xs text-slate-100 sm:px-6 lg:px-8">
          <section className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-300">
                Video Upload
              </p>
              <h1 className="mt-1 text-lg font-semibold text-slate-50 sm:text-xl">
                Upload videos to Cloudinary
              </h1>
              <p className="mt-1 text-[11px] text-slate-400">
                Select a video file to upload. It will be stored in Cloudinary
                and metadata saved in MongoDB.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1.5 text-[11px] text-slate-300 ring-1 ring-slate-700/60">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Backend</span>
              <code className="rounded bg-slate-950/80 px-1.5 py-0.5 text-[10px] text-sky-200">
                http://localhost:8000/upload
              </code>
            </div>
          </section>

          <section className="max-w-2xl">
            <VideoUpload />
          </section>
        </main>
      </div>
    </div>
  );
}
