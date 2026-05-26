const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";

async function getAccessToken() {
  const basic = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");
  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
    }).toString(),
  });
  return res.json();
}

async function toBase64(url) {
  try {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    return `data:image/jpeg;base64,${Buffer.from(buf).toString("base64")}`;
  } catch {
    return null;
  }
}

function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function truncate(str, max) {
  return str.length > max ? str.slice(0, max - 1) + "…" : str;
}

function fmtMs(ms) {
  const s = Math.floor(Math.abs(ms) / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

// 12 bars with varying max heights
const BAR_HEIGHTS = [0.45, 0.70, 0.90, 0.60, 1.00, 0.75, 0.55, 0.85, 0.65, 0.80, 0.50, 0.40];
const BAR_W = 3;
const BAR_GAP = 3;
const EQ_BARS = BAR_HEIGHTS.length;
const EQ_TOTAL_W = EQ_BARS * BAR_W + (EQ_BARS - 1) * BAR_GAP; // 69px
const EQ_MAX_H = 18;
const SVG_W = 480;
const PAD = 18;
const BAR_TRACK_W = SVG_W - PAD * 2; // 444px
const EQ_X_START = (SVG_W - EQ_TOTAL_W) / 2; // centered

function buildSvg(data, artBase64) {
  if (!data.isPlaying) {
    // Not playing — static dimmed EQ bars
    const eqY = 34;
    const eqBars = BAR_HEIGHTS.map((h, i) => {
      const x = EQ_X_START + i * (BAR_W + BAR_GAP);
      const bh = Math.max(2, Math.floor(EQ_MAX_H * h));
      return `<rect x="${x}" y="${eqY - bh}" width="${BAR_W}" height="${bh}" rx="1" fill="#30363d"/>`;
    }).join("");

    return `<svg width="${SVG_W}" height="56" xmlns="http://www.w3.org/2000/svg">
  <rect width="${SVG_W}" height="56" rx="10" fill="#161b22"/>
  <circle cx="${PAD + 6}" cy="28" r="5" fill="#1db954" opacity="0.35"/>
  <text x="${PAD + 18}" y="28" dominant-baseline="middle"
    font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
    font-size="12" fill="#484f58">Not listening to anything right now</text>
  ${eqBars}
</svg>`;
  }

  const pct = Math.min((data.progress / data.duration) * 100, 100);
  const filled = Math.max(0, Math.floor((pct / 100) * BAR_TRACK_W));
  const title  = esc(truncate(data.title, 42));
  const artist = esc(truncate(data.artist, 42));
  const elapsed   = fmtMs(data.progress);
  const remaining = "-" + fmtMs(data.duration - data.progress);

  // EQ bars centered, bottom anchored at y=92
  const EQ_BOTTOM = 92;
  const eqBars = BAR_HEIGHTS.map((h, i) => {
    const x  = EQ_X_START + i * (BAR_W + BAR_GAP);
    const bh = Math.max(2, Math.floor(EQ_MAX_H * h));
    const y  = EQ_BOTTOM - bh;
    const delay = (i * 0.065).toFixed(3);
    return `<rect class="eq-bar" x="${x}" y="${y}" width="${BAR_W}" height="${bh}" rx="1" fill="url(#eqG)" style="animation-delay:${delay}s"/>`;
  }).join("\n  ");

  // Album art offset — if no art, shift text to the left edge
  const ART_W = 38;
  const ART_PAD = artBase64 ? ART_W + 10 : 0;
  const TEXT_X = PAD + ART_PAD;

  return `<svg width="${SVG_W}" height="108" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="progG" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="#5000ca"/>
      <stop offset="100%" stop-color="#a78bfa"/>
    </linearGradient>
    <linearGradient id="eqG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="rgba(167,139,250,0.85)"/>
      <stop offset="100%" stop-color="rgba(80,0,202,0.85)"/>
    </linearGradient>
    ${artBase64 ? `<clipPath id="artClip"><rect x="${PAD}" y="12" width="${ART_W}" height="${ART_W}" rx="5"/></clipPath>` : ""}
  </defs>
  <style>
    .eq-bar {
      transform-box: fill-box;
      transform-origin: 50% 100%;
      animation: eq .95s ease-in-out infinite;
    }
    .live-dot {
      animation: pulse 1.8s ease-in-out infinite;
    }
    @keyframes eq {
      0%,100% { transform: scaleY(0.15); }
      50%      { transform: scaleY(1); }
    }
    @keyframes pulse {
      0%,100% { opacity: 1;   r: 4; }
      50%      { opacity: 0.3; r: 2.5; }
    }
  </style>

  <!-- Card background -->
  <rect width="${SVG_W}" height="108" rx="10" fill="#161b22"/>
  <rect width="${SVG_W}" height="108" rx="10" fill="none" stroke="rgba(167,139,250,0.15)" stroke-width="1"/>

  <!-- Album art -->
  ${artBase64 ? `<image href="${artBase64}" x="${PAD}" y="12" width="${ART_W}" height="${ART_W}" clip-path="url(#artClip)"/>` : ""}

  <!-- Live pulsing dot -->
  <circle class="live-dot" cx="${TEXT_X + 5}" cy="18" r="4" fill="#1db954"/>

  <!-- NOW PLAYING label -->
  <text x="${TEXT_X + 14}" y="18" dominant-baseline="middle"
    font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
    font-size="9" fill="#1db954" font-weight="700" letter-spacing="0.1em">NOW PLAYING</text>

  <!-- Track title -->
  <text x="${TEXT_X}" y="34" dominant-baseline="middle"
    font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
    font-size="14" fill="#e6edf3" font-weight="700">${title}</text>

  <!-- Artist -->
  <text x="${TEXT_X}" y="50" dominant-baseline="middle"
    font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
    font-size="12" fill="#8b949e">${artist}</text>

  <!-- Progress track -->
  <rect x="${PAD}" y="62" width="${BAR_TRACK_W}" height="3" rx="2" fill="#21262d"/>
  <!-- Progress fill -->
  <rect x="${PAD}" y="62" width="${filled}" height="3" rx="2" fill="url(#progG)"/>
  <!-- Glow dot at leading edge -->
  ${filled > 4 ? `<circle cx="${PAD + filled}" cy="63" r="4.5" fill="#a78bfa" filter="url(#glow)"/>` : ""}

  <!-- Elapsed time -->
  <text x="${PAD}" y="76" dominant-baseline="middle"
    font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
    font-size="10" fill="#484f58">${elapsed}</text>

  <!-- EQ bars -->
  ${eqBars}

  <!-- Remaining time -->
  <text x="${PAD + BAR_TRACK_W}" y="76" dominant-baseline="middle" text-anchor="end"
    font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
    font-size="10" fill="#484f58">${remaining}</text>
</svg>`;
}

module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    const { access_token } = await getAccessToken();
    if (!access_token) return res.end(buildSvg({ isPlaying: false }, null));

    const trackRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (trackRes.status === 204 || trackRes.status >= 400) {
      return res.end(buildSvg({ isPlaying: false }, null));
    }

    const song = await trackRes.json();
    if (!song?.item) return res.end(buildSvg({ isPlaying: false }, null));

    const artUrl = song.item.album.images[0]?.url;
    const artBase64 = artUrl ? await toBase64(artUrl) : null;

    return res.end(buildSvg({
      isPlaying: song.is_playing,
      title:    song.item.name,
      artist:   song.item.artists.map((a) => a.name).join(", "),
      progress: song.progress_ms,
      duration: song.item.duration_ms,
    }, artBase64));
  } catch {
    return res.end(buildSvg({ isPlaying: false }, null));
  }
};
