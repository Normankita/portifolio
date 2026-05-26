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

  const data = await res.json();
  if (!data.access_token) {
    console.error("Token refresh failed:", JSON.stringify(data));
  }
  return data;
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");

  try {
    const { access_token } = await getAccessToken();

    if (!access_token) {
      return res.status(200).json({ isPlaying: false, _debug: "token_refresh_failed" });
    }

    const trackRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (trackRes.status === 204) {
      return res.status(200).json({ isPlaying: false, _debug: "not_playing_204" });
    }

    if (trackRes.status >= 400) {
      const err = await trackRes.text();
      console.error("Now-playing error:", trackRes.status, err);
      return res.status(200).json({ isPlaying: false, _debug: `api_error_${trackRes.status}` });
    }

    const song = await trackRes.json();

    if (!song?.item) {
      return res.status(200).json({ isPlaying: false, _debug: "no_item" });
    }

    return res.status(200).json({
      isPlaying: song.is_playing,
      title: song.item.name,
      artist: song.item.artists.map((a) => a.name).join(", "),
      album: song.item.album.name,
      albumArt: song.item.album.images[0]?.url,
      songUrl: song.item.external_urls.spotify,
      progress: song.progress_ms,
      duration: song.item.duration_ms,
    });
  } catch (e) {
    console.error("Spotify handler error:", e);
    return res.status(200).json({ isPlaying: false, _debug: "exception" });
  }
};
