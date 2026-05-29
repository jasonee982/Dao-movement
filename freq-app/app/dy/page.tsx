"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface VideoInfo {
  title: string;
  thumbnail: string | null;
  duration: number | null;
  author: string | null;
  downloadUrl: string;
  ext: string;
  height: number | null;
  filesize: number | null;
}

function formatBytes(bytes: number | null): string {
  if (!bytes) return "";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDuration(sec: number | null): string {
  if (!sec) return "";
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function DyPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VideoInfo | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleParse(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/dy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Unknown error.");
      } else {
        setResult(data);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setUrl("");
    setResult(null);
    setError(null);
    inputRef.current?.focus();
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-16">
      {/* Header */}
      <div className="text-center mb-10 max-w-xl">
        <h1 className="text-3xl font-bold text-violet-400 mb-2 tracking-tight">
          抖音 / TikTok 视频下载
        </h1>
        <p className="text-sm text-[#a0a0b8]">
          无水印下载抖音和 TikTok 视频 · Watermark-free Douyin &amp; TikTok downloader
        </p>
      </div>

      {/* Input form */}
      <form
        onSubmit={handleParse}
        className="w-full max-w-xl flex gap-2 mb-6"
      >
        <input
          ref={inputRef}
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="粘贴抖音/TikTok 链接 · Paste Douyin or TikTok URL"
          className="flex-1 bg-[#13131f] border border-[#2a2a40] rounded-lg px-4 py-3 text-sm text-[#e8e8f0] placeholder-[#5a5a78] focus:outline-none focus:border-violet-500 transition"
        />
        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-3 rounded-lg transition whitespace-nowrap"
        >
          {loading ? "解析中…" : "解析"}
        </button>
        {(url || result) && (
          <button
            type="button"
            onClick={handleClear}
            className="bg-[#1e1e30] hover:bg-[#2a2a40] text-[#a0a0b8] text-sm px-4 py-3 rounded-lg transition"
          >
            清除
          </button>
        )}
      </form>

      {/* Error */}
      {error && (
        <div className="w-full max-w-xl bg-red-900/30 border border-red-700/50 rounded-lg px-4 py-3 text-sm text-red-300 mb-4">
          {error}
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="w-full max-w-xl bg-[#13131f] border border-[#2a2a40] rounded-xl p-5 animate-pulse">
          <div className="flex gap-4">
            <div className="w-32 h-20 bg-[#2a2a40] rounded-lg shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-[#2a2a40] rounded w-3/4" />
              <div className="h-3 bg-[#2a2a40] rounded w-1/2" />
              <div className="h-3 bg-[#2a2a40] rounded w-1/3" />
            </div>
          </div>
        </div>
      )}

      {/* Result card */}
      {result && !loading && (
        <div className="w-full max-w-xl bg-[#13131f] border border-[#2a2a40] rounded-xl p-5 space-y-4">
          <div className="flex gap-4">
            {result.thumbnail ? (
              <div className="relative w-32 h-20 rounded-lg overflow-hidden shrink-0 bg-[#0a0a0f]">
                <Image
                  src={result.thumbnail}
                  alt="thumbnail"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div className="w-32 h-20 rounded-lg bg-[#1e1e30] shrink-0 flex items-center justify-center text-2xl">
                🎬
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#e8e8f0] line-clamp-2 leading-snug mb-1">
                {result.title}
              </p>
              {result.author && (
                <p className="text-xs text-[#7070a0]">@{result.author}</p>
              )}
              <div className="flex gap-3 mt-2 text-xs text-[#5a5a78]">
                {result.duration && <span>{formatDuration(result.duration)}</span>}
                {result.height && <span>{result.height}p</span>}
                {result.filesize && <span>{formatBytes(result.filesize)}</span>}
              </div>
            </div>
          </div>

          <a
            href={result.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            download={`${result.title}.${result.ext}`}
            className="block w-full text-center bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium py-3 rounded-lg transition"
          >
            ⬇ 下载无水印视频 · Download (No Watermark)
          </a>

          <p className="text-xs text-center text-[#5a5a78]">
            链接有效期有限，请及时下载 · Download link may expire — save it now
          </p>
        </div>
      )}

      {/* Supported platforms */}
      <div className="mt-12 text-center text-xs text-[#5a5a78] space-y-1">
        <p>支持平台 · Supported platforms</p>
        <p className="text-[#7070a0]">
          抖音 douyin.com &nbsp;·&nbsp; v.douyin.com &nbsp;·&nbsp; TikTok tiktok.com
        </p>
      </div>
    </div>
  );
}
