import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import "../assets/styles/SpotifyWidget.scss";

interface LastPlayed {
  title: string;
  artist: string;
  albumArt?: string;
  songUrl?: string;
}

interface NowPlaying {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumArt?: string;
  songUrl?: string;
  progress?: number;
  duration?: number;
  lastPlayed?: LastPlayed | null;
}

function formatMs(ms: number): string {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

const EQ_BARS = 20;

function SpotifyWidget() {
  const [data, setData] = useState<NowPlaying>({ isPlaying: false });
  const [loading, setLoading] = useState(true);
  const [localProgress, setLocalProgress] = useState(0);

  useEffect(() => {
    async function poll() {
      try {
        const res = await fetch("/api/spotify");
        const json: NowPlaying = await res.json();
        setData(json);
        setLocalProgress(json.progress ?? 0);
      } catch {
        setData({ isPlaying: false });
      } finally {
        setLoading(false);
      }
    }
    poll();
    const id = setInterval(poll, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!data.isPlaying) return;
    const id = setInterval(() => {
      setLocalProgress((p) => {
        const next = p + 1000;
        return data.duration && next >= data.duration ? data.duration : next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [data.isPlaying, data.progress, data.duration]);

  const progressPct =
    data.duration && localProgress
      ? Math.min((localProgress / data.duration) * 100, 100)
      : 0;

  const remaining = (data.duration ?? 0) - localProgress;

  if (loading) {
    return (
      <div className="spotify-strip">
        <div className="spotify-strip-skeleton">
          <div className="skel-icon" />
          <div className="skel-text" />
        </div>
      </div>
    );
  }

  if (!data.isPlaying) {
    const lp = data.lastPlayed;
    return (
      <div className="spotify-strip offline">
        {lp ? (
          <a
            href={lp.songUrl}
            target="_blank"
            rel="noreferrer"
            className="spotify-strip-track"
          >
            <FontAwesomeIcon icon={faSpotify} className="sp-icon" />
            <span className="sp-last-label">Last played</span>
            {lp.albumArt && (
              <img src={lp.albumArt} alt={lp.title} className="sp-art" />
            )}
            <span className="sp-title">{lp.title}</span>
            <span className="sp-sep">·</span>
            <span className="sp-artist">{lp.artist}</span>
          </a>
        ) : (
          <div className="spotify-strip-header">
            <FontAwesomeIcon icon={faSpotify} className="sp-icon" />
            <span className="sp-label">Not playing right now</span>
          </div>
        )}
        <div className="sp-eq paused">
          {Array.from({ length: EQ_BARS }).map((_, i) => (
            <span key={i} className="sp-bar" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="spotify-strip">
      <a
        href={data.songUrl}
        target="_blank"
        rel="noreferrer"
        className="spotify-strip-track"
      >
        <FontAwesomeIcon icon={faSpotify} className="sp-icon playing" />
        <span className="sp-live-dot" />
        <img src={data.albumArt} alt={data.album} className="sp-art" />
        <span className="sp-title">{data.title}</span>
        <span className="sp-sep">·</span>
        <span className="sp-artist">{data.artist}</span>
      </a>

      <div className="sp-progress-track">
        <div
          className="sp-progress-fill"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="sp-bottom-row">
        <span className="sp-time">{formatMs(localProgress)}</span>
        <div className="sp-eq playing">
          {Array.from({ length: EQ_BARS }).map((_, i) => (
            <span key={i} className="sp-bar" />
          ))}
        </div>
        <span className="sp-time">-{formatMs(remaining)}</span>
      </div>
    </div>
  );
}

export default SpotifyWidget;
