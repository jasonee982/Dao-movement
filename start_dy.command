#!/bin/bash
# Double-click this file on Mac to start the Douyin downloader

cd "$(dirname "$0")"

# Install yt-dlp if missing
if ! command -v yt-dlp &>/dev/null; then
  echo "Installing yt-dlp..."
  pip3 install yt-dlp
fi

# Open browser after 1 second
sleep 1 && open http://localhost:8080 &

python3 dy_downloader.py
