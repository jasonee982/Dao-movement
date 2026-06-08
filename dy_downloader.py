#!/usr/bin/env python3
"""
Douyin / TikTok watermark-free video downloader
Usage: python3 dy_downloader.py
Then open: http://localhost:8080
"""

import json
import subprocess
import sys
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse

PORT = 8080

SUPPORTED = ("douyin.com", "v.douyin.com", "tiktok.com", "vm.tiktok.com", "vt.tiktok.com")

HTML = r"""<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>抖音/TikTok 去水印下载</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#0a0a0f;color:#e8e8f0;font-family:'Segoe UI',system-ui,sans-serif;min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:60px 16px}
  h1{color:#a78bfa;font-size:1.8rem;font-weight:700;margin-bottom:8px;text-align:center}
  .sub{color:#7070a0;font-size:.85rem;text-align:center;margin-bottom:32px}
  .row{display:flex;gap:8px;width:100%;max-width:560px;margin-bottom:16px}
  input{flex:1;background:#13131f;border:1px solid #2a2a40;border-radius:10px;padding:12px 16px;font-size:.9rem;color:#e8e8f0;outline:none;transition:border .2s}
  input:focus{border-color:#7c3aed}
  input::placeholder{color:#5a5a78}
  button{background:#7c3aed;color:#fff;border:none;border-radius:10px;padding:12px 20px;font-size:.9rem;font-weight:600;cursor:pointer;transition:background .2s;white-space:nowrap}
  button:hover{background:#6d28d9}
  button:disabled{opacity:.4;cursor:not-allowed}
  #clearBtn{background:#1e1e30;color:#a0a0b8}
  #clearBtn:hover{background:#2a2a40}
  .card{width:100%;max-width:560px;background:#13131f;border:1px solid #2a2a40;border-radius:14px;padding:20px;display:none}
  .card.visible{display:block}
  .meta{display:flex;gap:16px;margin-bottom:16px}
  .thumb{width:128px;height:80px;object-fit:cover;border-radius:8px;background:#1e1e30;flex-shrink:0}
  .thumb-placeholder{width:128px;height:80px;border-radius:8px;background:#1e1e30;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:2rem}
  .info{flex:1;min-width:0}
  .title{font-size:.9rem;font-weight:500;line-height:1.4;margin-bottom:6px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
  .author{font-size:.8rem;color:#7070a0;margin-bottom:8px}
  .tags{display:flex;gap:10px;font-size:.75rem;color:#5a5a78}
  .dl-btn{display:block;width:100%;text-align:center;background:#7c3aed;color:#fff;text-decoration:none;padding:12px;border-radius:10px;font-size:.9rem;font-weight:600;transition:background .2s;margin-bottom:8px}
  .dl-btn:hover{background:#6d28d9}
  .hint{text-align:center;font-size:.75rem;color:#5a5a78}
  .error{width:100%;max-width:560px;background:#3b0a0a;border:1px solid #7f1d1d;border-radius:10px;padding:12px 16px;color:#fca5a5;font-size:.85rem;display:none}
  .error.visible{display:block}
  .skeleton{animation:pulse 1.4s infinite}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
  .skel-block{background:#2a2a40;border-radius:6px}
  .platforms{margin-top:48px;text-align:center;color:#5a5a78;font-size:.75rem;line-height:2}
</style>
</head>
<body>
<h1>抖音 / TikTok 去水印下载</h1>
<p class="sub">无水印下载抖音和 TikTok 视频 · Watermark-free downloader</p>

<div class="row">
  <input id="urlInput" type="text" placeholder="粘贴抖音/TikTok 链接 · Paste URL here"/>
  <button id="parseBtn" onclick="parse()">解析</button>
  <button id="clearBtn" onclick="clear_()" style="display:none">清除</button>
</div>

<div class="error" id="errBox"></div>

<div class="card" id="card">
  <div class="meta" id="metaArea"></div>
  <a class="dl-btn" id="dlBtn" target="_blank" rel="noopener">⬇ 下载无水印视频 · Download (No Watermark)</a>
  <p class="hint">链接有效期有限，请及时下载 · Link may expire — download now</p>
</div>

<div class="platforms">
  <div>支持平台 · Supported</div>
  <div style="color:#7070a0">抖音 douyin.com &nbsp;·&nbsp; v.douyin.com &nbsp;·&nbsp; TikTok tiktok.com</div>
</div>

<script>
const $ = id => document.getElementById(id);

function fmtDur(s){if(!s)return'';const m=Math.floor(s/60),sec=s%60;return m+':'+(sec+'').padStart(2,'0')}
function fmtSize(b){if(!b)return'';return b<1048576?(b/1024).toFixed(0)+' KB':(b/1048576).toFixed(1)+' MB'}

async function parse(){
  const url=$('urlInput').value.trim();
  if(!url)return;
  $('parseBtn').disabled=true;
  $('errBox').classList.remove('visible');
  $('card').classList.remove('visible');
  $('clearBtn').style.display='';

  // show skeleton
  $('card').classList.add('visible');
  $('metaArea').innerHTML=`
    <div class="thumb-placeholder skeleton"><div class="skel-block" style="width:100%;height:100%;border-radius:8px"></div></div>
    <div class="info" style="flex:1">
      <div class="skel-block skeleton" style="height:14px;width:75%;margin-bottom:10px"></div>
      <div class="skel-block skeleton" style="height:12px;width:50%;margin-bottom:8px"></div>
      <div class="skel-block skeleton" style="height:12px;width:33%"></div>
    </div>`;
  $('dlBtn').style.display='none';

  try{
    const res=await fetch('/parse',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({url})});
    const data=await res.json();
    if(!res.ok){showErr(data.error||'Unknown error');$('card').classList.remove('visible');return;}

    const tags=[fmtDur(data.duration),data.height?data.height+'p':'',fmtSize(data.filesize)].filter(Boolean).join(' · ');
    $('metaArea').innerHTML=`
      ${data.thumbnail
        ?`<img class="thumb" src="${data.thumbnail}" onerror="this.style.display='none'" alt=""/>`
        :`<div class="thumb-placeholder">🎬</div>`}
      <div class="info">
        <div class="title">${escHtml(data.title||'Video')}</div>
        ${data.author?`<div class="author">@${escHtml(data.author)}</div>`:''}
        ${tags?`<div class="tags">${escHtml(tags)}</div>`:''}
      </div>`;
    $('dlBtn').href=data.downloadUrl;
    $('dlBtn').download=(data.title||'video')+'.'+data.ext;
    $('dlBtn').style.display='';
  }catch(e){
    showErr('Network error. Is the server running?');
    $('card').classList.remove('visible');
  }finally{
    $('parseBtn').disabled=false;
  }
}

function showErr(msg){$('errBox').textContent=msg;$('errBox').classList.add('visible')}
function clear_(){
  $('urlInput').value='';
  $('card').classList.remove('visible');
  $('errBox').classList.remove('visible');
  $('clearBtn').style.display='none';
  $('urlInput').focus();
}
function escHtml(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}

$('urlInput').addEventListener('keydown',e=>{if(e.key==='Enter')parse()});
</script>
</body>
</html>
"""


def is_supported(url: str) -> bool:
    try:
        host = urlparse(url).hostname or ""
        return any(host == d or host.endswith("." + d) for d in SUPPORTED)
    except Exception:
        return False


class Handler(BaseHTTPRequestHandler):
    def log_message(self, fmt, *args):  # silence default access log
        pass

    def send_json(self, code: int, data: dict):
        body = json.dumps(data).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        body = HTML.encode()
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        if self.path != "/parse":
            self.send_json(404, {"error": "Not found"})
            return

        length = int(self.headers.get("Content-Length", 0))
        try:
            body = json.loads(self.rfile.read(length))
        except Exception:
            self.send_json(400, {"error": "Invalid JSON"})
            return

        url = (body.get("url") or "").strip()
        if not url:
            self.send_json(400, {"error": "URL is required."})
            return

        if not is_supported(url):
            self.send_json(400, {"error": "Only Douyin and TikTok URLs are supported."})
            return

        try:
            result = subprocess.run(
                ["yt-dlp", "-j", "--no-warnings", "--no-check-certificates", url],
                capture_output=True, text=True, timeout=30
            )
            if result.returncode != 0:
                err = result.stderr.strip().splitlines()[-1] if result.stderr.strip() else "yt-dlp failed"
                self.send_json(422, {"error": f"Could not parse video: {err}"})
                return

            lines = [l for l in result.stdout.splitlines() if l.strip()]
            info = json.loads(lines[-1])

            formats = info.get("formats") or []
            video_fmts = [
                f for f in formats
                if f.get("vcodec", "none") != "none"
                and f.get("ext") == "mp4"
                and "watermark" not in f.get("format_id", "").lower()
            ]
            video_fmts.sort(key=lambda f: f.get("height") or 0, reverse=True)
            best = video_fmts[0] if video_fmts else (formats[0] if formats else None)

            if not best or not best.get("url"):
                self.send_json(422, {"error": "Could not extract a download URL."})
                return

            self.send_json(200, {
                "title": info.get("title", "video"),
                "thumbnail": info.get("thumbnail"),
                "duration": info.get("duration"),
                "author": info.get("uploader") or info.get("creator"),
                "downloadUrl": best["url"],
                "ext": best.get("ext", "mp4"),
                "height": best.get("height"),
                "filesize": best.get("filesize"),
            })

        except subprocess.TimeoutExpired:
            self.send_json(422, {"error": "Request timed out. The video may be private or region-locked."})
        except Exception as e:
            self.send_json(500, {"error": str(e)})


def main():
    # Check yt-dlp is available
    try:
        subprocess.run(["yt-dlp", "--version"], capture_output=True, check=True)
    except FileNotFoundError:
        print("yt-dlp not found. Install it with:  pip install yt-dlp")
        sys.exit(1)

    server = HTTPServer(("0.0.0.0", PORT), Handler)
    print(f"✓  Server running at http://localhost:{PORT}")
    print("   Paste a Douyin or TikTok URL and click 解析 to download without watermark.")
    print("   Press Ctrl+C to stop.\n")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")


if __name__ == "__main__":
    main()
