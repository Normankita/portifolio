import "../assets/styles/SpotifyWidget.scss";

const BASE = "https://spotify-github-profile.kittinanx.com/api/view?uid=317m2vyqcjzo44xkxyf4q73sa2iu";
const REDIRECT = `${BASE}&redirect=true`;

function embedUrl(isDark: boolean) {
  const bg = isDark ? "0d1116" : "f8f9fa";
  const mode = isDark ? "dark" : "light";
  return `${BASE}&cover_image=true&theme=spotify-embed&show_offline=true&background_color=${bg}&interchange=true&profanity=true&mode=${mode}&bar_color=5000ca&bar_color_cover=false`;
}

interface Props {
  mode: string;
}

function SpotifyWidget({ mode }: Props) {
  const isDark = mode === "dark";

  return (
    <div className="spotify-card">
      <div className="spotify-header">
        <div className="soundwave">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <span className="now-playing-label">Currently Playing</span>
      </div>
      <a
        href={REDIRECT}
        target="_blank"
        rel="noreferrer"
        className="spotify-embed-link"
      >
        <img
          src={embedUrl(isDark)}
          alt="Spotify Now Playing"
          className="spotify-embed-img"
        />
      </a>
    </div>
  );
}

export default SpotifyWidget;
