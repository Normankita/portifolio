import { useEffect, useRef, useState } from "react";

const DESKTOP_WIDTH = 1440;
const DESKTOP_HEIGHT = 900;

interface Props {
  src: string;
  title: string;
  href: string;
  label: string;
}

function IframePreview({ src, title, href, label }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / DESKTOP_WIDTH);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: scale ? DESKTOP_HEIGHT * scale : 300,
        overflow: "hidden",
        borderRadius: 5,
        background: "#f0f0f0",
      }}
    >
      {scale > 0 && (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: DESKTOP_WIDTH,
            height: DESKTOP_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            pointerEvents: "none",
            border: "none",
          }}
        />
      )}
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="project-preview-overlay"
        aria-label={label}
      />
    </div>
  );
}

export default IframePreview;
