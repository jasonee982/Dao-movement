import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const SUPPORTED_DOMAINS = [
  "douyin.com",
  "v.douyin.com",
  "tiktok.com",
  "vm.tiktok.com",
  "vt.tiktok.com",
];

function isSupportedUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return SUPPORTED_DOMAINS.some((d) => parsed.hostname.endsWith(d));
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const url: string = (body.url ?? "").trim();

  if (!url) {
    return NextResponse.json({ error: "URL is required." }, { status: 400 });
  }

  if (!isSupportedUrl(url)) {
    return NextResponse.json(
      { error: "Only Douyin and TikTok URLs are supported." },
      { status: 400 }
    );
  }

  try {
    // --no-check-certificates handles some CDN issues; -j dumps JSON info without downloading
    const { stdout } = await execAsync(
      `yt-dlp -j --no-warnings --no-check-certificates "${url.replace(/"/g, "")}"`,
      { timeout: 30000 }
    );

    const info = JSON.parse(stdout.split("\n").filter(Boolean).pop()!);

    // Pick the best non-watermarked format (Douyin watermark formats have "watermark" in format id)
    const formats: Array<{
      format_id: string;
      ext: string;
      url: string;
      filesize?: number;
      height?: number;
      vcodec?: string;
    }> = info.formats ?? [];

    const videoFormats = formats.filter(
      (f) =>
        f.vcodec !== "none" &&
        f.ext === "mp4" &&
        !f.format_id.toLowerCase().includes("watermark")
    );

    // Sort by height descending — best quality first
    videoFormats.sort((a, b) => (b.height ?? 0) - (a.height ?? 0));

    const best = videoFormats[0] ?? formats[0];

    if (!best?.url) {
      return NextResponse.json(
        { error: "Could not extract a download URL from this video." },
        { status: 422 }
      );
    }

    return NextResponse.json({
      title: info.title ?? "video",
      thumbnail: info.thumbnail ?? null,
      duration: info.duration ?? null,
      author: info.uploader ?? info.creator ?? null,
      downloadUrl: best.url,
      ext: best.ext ?? "mp4",
      height: best.height ?? null,
      filesize: best.filesize ?? null,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    const userMsg = msg.includes("Unsupported URL")
      ? "This URL is not supported. Please paste a valid Douyin or TikTok video link."
      : msg.includes("timed out")
      ? "Request timed out. The video may be private or region-locked."
      : "Failed to parse video. The link may be expired, private, or region-locked.";

    return NextResponse.json({ error: userMsg }, { status: 422 });
  }
}
