const TOKEN_ENDPOINT        = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT  = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_URL   = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

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

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");

  try {
    const { access_token } = await getAccessToken();

    if (!access_token) {
      return res.status(200).json({ isPlaying: false, lastPlayed: null });
    }

    const trackRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (trackRes.status === 204 || trackRes.status >= 400) {
      const lastPlayed = await getLastPlayed(access_token);
      return res.status(200).json({ isPlaying: false, lastPlayed });
    }

    const song = await trackRes.json();

    if (!song?.item || !song.is_playing) {
      const lastPlayed = await getLastPlayed(access_token);
      return res.status(200).json({ isPlaying: false, lastPlayed });
    }

    return res.status(200).json({
      isPlaying: true,
      title:     song.item.name,
      artist:    song.item.artists.map((a) => a.name).join(", "),
      album:     song.item.album.name,
      albumArt:  song.item.album.images[0]?.url,
      songUrl:   song.item.external_urls.spotify,
      progress:  song.progress_ms,
      duration:  song.item.duration_ms,
    });
  } catch {
    return res.status(200).json({ isPlaying: false, lastPlayed: null });
  }
};
