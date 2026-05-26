const fs = require("fs");

// Parse .env.local manually
try {
  fs.readFileSync(".env.local", "utf8")
    .split("\n")
    .forEach((line) => {
      const m = line.match(/^([A-Z_]+)="?([^"]*)"?$/);
      if (m) process.env[m[1]] = m[2];
    });
} catch {}

const CLIENT_ID     = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

console.log("CLIENT_ID    :", CLIENT_ID     ? CLIENT_ID     : "MISSING");
console.log("CLIENT_SECRET:", CLIENT_SECRET ? "set (" + CLIENT_SECRET.slice(0,6) + "...)" : "MISSING");
console.log("REFRESH_TOKEN:", REFRESH_TOKEN ? "set"          : "MISSING");
console.log("");

async function run() {
  // 1. Get access token
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }).toString(),
  });

  const tokenData = await tokenRes.json();

  if (!tokenData.access_token) {
    console.error("Token refresh FAILED:", JSON.stringify(tokenData, null, 2));
    return;
  }
  console.log("Token refresh OK");

  // 2. Get now playing
  const trackRes = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    { headers: { Authorization: `Bearer ${tokenData.access_token}` } }
  );

  if (trackRes.status === 204) {
    console.log("Spotify says: nothing playing right now (204)");
    return;
  }

  if (trackRes.status >= 400) {
    const body = await trackRes.text();
    console.error("Now-playing error", trackRes.status, body);
    return;
  }

  const song = await trackRes.json();
  if (!song?.item) {
    console.log("Response OK but no track item (podcast / ad?):", JSON.stringify(song));
    return;
  }

  console.log("Now playing:", song.item.name, "—", song.item.artists.map(a => a.name).join(", "));
  console.log("Is playing:", song.is_playing);
}

run().catch(console.error);
