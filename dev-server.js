const http = require("http");
const fs = require("fs");

// Load .env.local into process.env
try {
  fs.readFileSync(".env.local", "utf8")
    .split("\n")
    .forEach((line) => {
      const m = line.match(/^([A-Z_]+)="?([^"]*)"?$/);
      if (m) process.env[m[1]] = m[2];
    });
} catch {}

const spotifyHandler         = require("./api/spotify");
const spotifySvgHandler      = require("./api/spotify-svg");
const vercelProjectsHandler  = require("./api/vercel-projects");

function mockRes(res) {
  return {
    setHeader(key, val) { res.setHeader(key, val); },
    status(code) { res.statusCode = code; return this; },
    json(data) {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
    },
    end(data)  { res.end(data); },
    send(data) { res.end(data); },
  };
}

const server = http.createServer(async (req, res) => {
  if (req.url === "/api/spotify") {
    await spotifyHandler(req, mockRes(res));
  } else if (req.url === "/api/spotify-svg") {
    await spotifySvgHandler(req, mockRes(res));
  } else if (req.url === "/api/vercel-projects") {
    await vercelProjectsHandler(req, mockRes(res));
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});

server.listen(3001, () =>
  console.log("Spotify API server → http://localhost:3001/api/spotify")
);
