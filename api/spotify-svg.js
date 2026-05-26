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
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function buildSvg(data) {
  if (!data.isPlaying) {
    return `<svg width="480" height="52" xmlns="http://www.w3.org/2000/svg">
  <rect width="480" height="52" rx="10" fill="#161b22"/>
  <circle cx="26" cy="26" r="7" fill="#1db954" opacity="0.4"/>
  <text x="42" y="27" dominant-baseline="middle"
    font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
    font-size="13" fill="#8b949e">
    Not listening to anything right now
  </text>
</svg>`;
  }

  const pct = Math.min((data.progress / data.duration) * 100, 100);
  const BAR_X = 42;
  const BAR_W = 408;
  const filled = Math.max(0, Math.floor((pct / 100) * BAR_W));
  const title  = esc(truncate(data.title, 45));
  const artist = esc(truncate(data.artist, 45));

  return `<svg width="480" height="86" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="#5000ca"/>
      <stop offset="100%" stop-color="#a78bfa"/>
    </linearGradient>
  </defs>
  <rect width="480" height="86" rx="10" fill="#161b22"/>
  <!-- Green live dot -->
  <circle cx="26" cy="24" r="5" fill="#1db954"/>
  <!-- NOW PLAYING label -->
  <text x="38" y="20" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
    font-size="10" fill="#1db954" font-weight="700" letter-spacing="0.08em">NOW PLAYING</text>
  <!-- Track title -->
  <text x="38" y="36" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
    font-size="14" fill="#e6edf3" font-weight="700">${title}</text>
  <!-- Artist -->
  <text x="38" y="51" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
    font-size="12" fill="#8b949e">${artist}</text>
  <!-- Progress track -->
  <rect x="${BAR_X}" y="62" width="${BAR_W}" height="3" rx="2" fill="#30363d"/>
  <!-- Progress fill -->
  <rect x="${BAR_X}" y="62" width="${filled}" height="3" rx="2" fill="url(#bar)"/>
  <!-- Glow dot at progress head -->
  <circle cx="${BAR_X + filled}" cy="63" r="4" fill="#a78bfa" opacity="${filled > 0 ? 1 : 0}"/>
  <!-- Times -->
  <text x="${BAR_X}" y="76" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
    font-size="10" fill="#484f58">${fmtMs(data.progress)}</text>
  <text x="${BAR_X + BAR_W}" y="76" text-anchor="end"
    font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
    font-size="10" fill="#484f58">${fmtMs(data.duration)}</text>
</svg>`;
}

module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    const { access_token } = await getAccessToken();
    if (!access_token) {
      return res.end(buildSvg({ isPlaying: false }));
    }

    const trackRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (trackRes.status === 204 || trackRes.status >= 400) {
      return res.end(buildSvg({ isPlaying: false }));
    }

    const song = await trackRes.json();
    if (!song?.item) {
      return res.end(buildSvg({ isPlaying: false }));
    }

    return res.end(buildSvg({
      isPlaying: song.is_playing,
      title: song.item.name,
      artist: song.item.artists.map((a) => a.name).join(", "),
      progress: song.progress_ms,
      duration: song.item.duration_ms,
    }));
  } catch {
    return res.end(buildSvg({ isPlaying: false }));
  }
};
