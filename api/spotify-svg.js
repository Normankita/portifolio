const TOKEN_ENDPOINT       = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_URL  = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

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

async function getLastPlayed(access_token) {
  try {
    const res = await fetch(RECENTLY_PLAYED_URL, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const track = data?.items?.[0]?.track;
    if (!track) return null;
    return {
      title:    track.name,
      artist:   track.artists.map((a) => a.name).join(", "),
      albumArt: track.album.images[0]?.url,
      songUrl:  track.external_urls.spotify,
    };
  } catch {
    return null;
  }
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

const BAR_HEIGHTS  = [0.45, 0.70, 0.90, 0.60, 1.00, 0.75, 0.55, 0.85, 0.65, 0.80, 0.50, 0.40];
const BAR_W        = 3;
const BAR_GAP      = 3;
const EQ_BARS      = BAR_HEIGHTS.length;
const EQ_TOTAL_W   = EQ_BARS * BAR_W + (EQ_BARS - 1) * BAR_GAP;
const EQ_MAX_H     = 18;
const SVG_W        = 480;
const PAD          = 18;
const BAR_TRACK_W  = SVG_W - PAD * 2;
const EQ_X_START   = (SVG_W - EQ_TOTAL_W) / 2;

function eqBarsMarkup(bottomY, playing) {
  return BAR_HEIGHTS.map((h, i) => {
    const x     = EQ_X_START + i * (BAR_W + BAR_GAP);
    const bh    = Math.max(2, Math.floor(EQ_MAX_H * h));
    const y     = bottomY - bh;
    const delay = (i * 0.065).toFixed(3);
    const cls   = playing ? "eq-bar" : "eq-bar-off";
    return `<rect class="${cls}" x="${x}" y="${y}" width="${BAR_W}" height="${bh}" rx="1"
      fill="${playing ? "url(#eqG)" : "#21262d"}" style="animation-delay:${delay}s"/>`;
  }).join("\n  ");
}

function cardBase(height, artBase64, artY, ART_W, textX, label, labelColor, title, artist) {
  return `
  <!-- Card -->
  <rect width="${SVG_W}" height="${height}" rx="10" fill="#161b22"/>
  <rect width="${SVG_W}" height="${height}" rx="10" fill="none" stroke="rgba(167,139,250,0.15)" stroke-width="1"/>
  ${artBase64 ? `<image href="${artBase64}" x="${PAD}" y="${artY}" width="${ART_W}" height="${ART_W}" clip-path="url(#artClip)"/>` : ""}
  <!-- Label -->
  <text x="${textX + 14}" y="${artY + 6}" dominant-baseline="middle"
    font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
    font-size="9" fill="${labelColor}" font-weight="700" letter-spacing="0.1em">${label}</text>
  <!-- Title -->
  <text x="${textX}" y="${artY + 22}" dominant-baseline="middle"
    font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
    font-size="14" fill="#e6edf3" font-weight="700">${title}</text>
  <!-- Artist -->
  <text x="${textX}" y="${artY + 38}" dominant-baseline="middle"
    font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
    font-size="12" fill="#8b949e">${artist}</text>`;
}

function buildSvg(data, artBase64) {
  const ART_W   = 38;
  const ART_Y   = 12;
  const ART_PAD = artBase64 ? ART_W + 10 : 0;
  const TEXT_X  = PAD + ART_PAD;

  const defs = `
  <defs>
    <linearGradient id="progG" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="#5000ca"/>
      <stop offset="100%" stop-color="#a78bfa"/>
    </linearGradient>
    <linearGradient id="eqG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="rgba(167,139,250,0.85)"/>
      <stop offset="100%" stop-color="rgba(80,0,202,0.85)"/>
    </linearGradient>
    ${artBase64 ? `<clipPath id="artClip"><rect x="${PAD}" y="${ART_Y}" width="${ART_W}" height="${ART_W}" rx="5"/></clipPath>` : ""}
  </defs>`;

  // ── Not playing ────────────────────────────────────────────────────────────
  if (!data.isPlaying) {
    const lp = data.lastPlayed;

    if (!lp) {
      // No last played data at all
      return `<svg width="${SVG_W}" height="56" xmlns="http://www.w3.org/2000/svg">
  <rect width="${SVG_W}" height="56" rx="10" fill="#161b22"/>
  <rect width="${SVG_W}" height="56" rx="10" fill="none" stroke="rgba(167,139,250,0.15)" stroke-width="1"/>
  <circle cx="${PAD + 6}" cy="28" r="5" fill="#1db954" opacity="0.3"/>
  <text x="${PAD + 18}" y="28" dominant-baseline="middle"
    font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
    font-size="13" fill="#484f58">Not listening to anything right now</text>
</svg>`;
    }

    const title  = esc(truncate(lp.title,  42));
    const artist = esc(truncate(lp.artist, 42));
    const SVG_H  = 80;
    const EQ_BOT = SVG_H - 8;

    return `<svg width="${SVG_W}" height="${SVG_H}" xmlns="http://www.w3.org/2000/svg">
  ${defs}
  <style>
    @keyframes eq { 0%,100% { transform: scaleY(0.15); } 50% { transform: scaleY(1); } }
    .eq-bar { transform-box: fill-box; transform-origin: 50% 100%; animation: eq .95s ease-in-out infinite; }
  </style>
  ${cardBase(SVG_H, artBase64, ART_Y, ART_W, TEXT_X, "LAST PLAYED", "rgba(167,139,250,0.7)", title, artist)}
  ${eqBarsMarkup(EQ_BOT, false)}
</svg>`;
  }

  // ── Now playing ────────────────────────────────────────────────────────────
  const pct          = Math.min((data.progress / data.duration) * 100, 100);
  const filled       = Math.max(0, Math.floor((pct / 100) * BAR_TRACK_W));
  const dashOffset   = BAR_TRACK_W - filled;           // stroke-dashoffset start
  const remainingSec = Math.max(1, (data.duration - data.progress) / 1000).toFixed(2);
  const title        = esc(truncate(data.title,  42));
  const artist       = esc(truncate(data.artist, 42));
  const totalTime    = fmtMs(data.duration);
  const SVG_H        = 108;
  const EQ_BOT       = SVG_H - 8;
  const LINE_Y       = 63;

  return `<svg width="${SVG_W}" height="${SVG_H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Gradient in userSpaceOnUse so it works on a <line> stroke -->
    <linearGradient id="progG" x1="${PAD}" y1="0" x2="${PAD + BAR_TRACK_W}" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%"   stop-color="#5000ca"/>
      <stop offset="100%" stop-color="#a78bfa"/>
    </linearGradient>
    <linearGradient id="eqG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="rgba(167,139,250,0.85)"/>
      <stop offset="100%" stop-color="rgba(80,0,202,0.85)"/>
    </linearGradient>
    ${artBase64 ? `<clipPath id="artClip"><rect x="${PAD}" y="${ART_Y}" width="${ART_W}" height="${ART_W}" rx="5"/></clipPath>` : ""}
  </defs>
  <style>
    @keyframes eq    { 0%,100% { transform: scaleY(0.15); } 50% { transform: scaleY(1); } }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
    .eq-bar   { transform-box: fill-box; transform-origin: 50% 100%; animation: eq .95s ease-in-out infinite; }
    .live-dot { animation: pulse 1.8s ease-in-out infinite; }
  </style>
  ${cardBase(SVG_H, artBase64, ART_Y, ART_W, TEXT_X, "NOW PLAYING", "#1db954", title, artist)}

  <!-- Live dot -->
  <circle class="live-dot" cx="${TEXT_X + 5}" cy="${ART_Y + 6}" r="4" fill="#1db954"/>

  <!-- Progress track -->
  <line x1="${PAD}" y1="${LINE_Y}" x2="${PAD + BAR_TRACK_W}" y2="${LINE_Y}"
    stroke="#21262d" stroke-width="3" stroke-linecap="round"/>

  <!-- Progress fill — stroke-dashoffset animates reliably in all SVG img contexts -->
  <line x1="${PAD}" y1="${LINE_Y}" x2="${PAD + BAR_TRACK_W}" y2="${LINE_Y}"
    stroke="url(#progG)" stroke-width="3" stroke-linecap="round"
    stroke-dasharray="${BAR_TRACK_W}" stroke-dashoffset="${dashOffset}">
    <animate attributeName="stroke-dashoffset"
      from="${dashOffset}" to="0"
      dur="${remainingSec}s" calcMode="linear"
      fill="freeze" begin="0s"/>
  </line>

  <!-- Glow dot — follows the fill head -->
  <circle cx="${PAD + filled}" cy="${LINE_Y}" r="4.5" fill="#a78bfa">
    <animate attributeName="cx"
      from="${PAD + filled}" to="${PAD + BAR_TRACK_W}"
      dur="${remainingSec}s" calcMode="linear"
      fill="freeze" begin="0s"/>
  </circle>

  <!-- EQ bars -->
  ${eqBarsMarkup(EQ_BOT, true)}

  <!-- Total duration (right side — always accurate, no ticking needed) -->
  <text x="${PAD + BAR_TRACK_W}" y="76" dominant-baseline="middle" text-anchor="end"
    font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
    font-size="10" fill="#484f58">${totalTime}</text>
</svg>`;
}

module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate=20");
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    const { access_token } = await getAccessToken();
    if (!access_token) return res.end(buildSvg({ isPlaying: false, lastPlayed: null }, null));

    const trackRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (trackRes.status === 204 || trackRes.status >= 400) {
      const lastPlayed = await getLastPlayed(access_token);
      const artBase64  = lastPlayed?.albumArt ? await toBase64(lastPlayed.albumArt) : null;
      return res.end(buildSvg({ isPlaying: false, lastPlayed }, artBase64));
    }

    const song = await trackRes.json();

    if (!song?.item || !song.is_playing) {
      const lastPlayed = await getLastPlayed(access_token);
      const artBase64  = lastPlayed?.albumArt ? await toBase64(lastPlayed.albumArt) : null;
      return res.end(buildSvg({ isPlaying: false, lastPlayed }, artBase64));
    }

    const artBase64 = song.item.album.images[0]?.url
      ? await toBase64(song.item.album.images[0].url)
      : null;

    return res.end(buildSvg({
      isPlaying: true,
      title:     song.item.name,
      artist:    song.item.artists.map((a) => a.name).join(", "),
      progress:  song.progress_ms,
      duration:  song.item.duration_ms,
    }, artBase64));
  } catch {
    return res.end(buildSvg({ isPlaying: false, lastPlayed: null }, null));
  }
};
