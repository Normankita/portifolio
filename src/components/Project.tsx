import { useEffect, useState } from "react";
import mock09 from "../assets/images/mock09.png";
import "../assets/styles/Project.scss";
import IframePreview from "./IframePreview";

interface FeaturedProject {
  id: string;
  title: string;
  url: string;
  linkLabel: string;
  headline: string;
  problem: string;
  builtIt: string;
  status: string;
  tags: string[];
  preview: "iframe" | "image";
  image?: string;
}

// The four featured projects are hardcoded on purpose: they must render
// correctly even if the Vercel API call below is slow, rate-limited, or
// down. Nothing in this list depends on /api/vercel-projects.
const featuredProjects: FeaturedProject[] = [
  {
    id: "harusi-kadi",
    title: "Harusi Kadi",
    url: "https://harusi.norzah.dev/",
    linkLabel: "View live project",
    headline: "Wedding invitations made in minutes",
    problem:
      "Couples and event planners needed a fast way to design, preview and share wedding invitations without hiring a designer or waiting on a print shop.",
    builtIt:
      "An interactive wedding card generator and preview platform with real-time template customization, dynamic contribution tracking, and custom print/export-ready layouts.",
    status: "Live at harusi.norzah.dev and open for anyone to create a card.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "React"],
    preview: "iframe",
  },
  {
    id: "kilimo-smart-assist",
    title: "NorZah Kilimo Smart Assist",
    url: "https://kilimo-ai.norzah.dev/",
    linkLabel: "View live project",
    headline: "Farming advice from an AI assistant",
    problem:
      "Smallholder farmers often lack quick access to localized agronomic expertise for crop issues and day-to-day farming decisions.",
    builtIt:
      "An AI-driven agricultural assistant that gives localized crop advice, disease diagnosis, and smart farming insights for regional farmers.",
    status: "Live at kilimo-ai.norzah.dev as a working product.",
    tags: ["React", "TypeScript", "AI / LLM API", "Tailwind CSS"],
    preview: "iframe",
  },
  {
    id: "mzumbe-fyp-portal",
    title: "Mzumbe FYP Management Portal",
    url: "https://fyp-mzumbe.norzah.dev",
    linkLabel: "View live project",
    headline: "Final-year project supervision in one portal",
    problem:
      "Final-year projects at universities are often tracked through manual, ad-hoc processes, which makes supervision and sign-off hard to follow.",
    builtIt:
      "A proposed project tracking and supervision portal, designed around Mzumbe University's final-year process, with role-based access control and automated progress tracking. Built with Django and PostgreSQL.",
    status:
      "Working prototype with a live demo. Built as a proposed solution, not commissioned by the university.",
    tags: ["React", "Django", "PostgreSQL"],
    preview: "iframe",
  },
  {
    id: "reservation-system",
    title: "Reservation System",
    url: "https://github.com/Normankita/TMH",
    linkLabel: "View on GitHub",
    headline: "Bookings and availability for property managers",
    problem:
      "Property managers handling multiple units needed one system to manage bookings and avoid double-booking across properties.",
    builtIt:
      "A multi-tenant booking and property management system with real-time availability calendars and tenant scheduling, built with Yii2 MVC and MySQL.",
    status: "Complete codebase available on GitHub.",
    tags: ["PHP", "Yii2", "MySQL"],
    preview: "image",
    image: mock09,
  },
];

// ── "More projects" — a compact list below the featured work ────────────────
interface MoreProject {
  title: string;
  url: string;
  description: string;
}

interface VercelProject {
  id: string;
  name: string;
  framework: string | null;
  url: string;
}

interface VercelMoreEnrichment {
  title: string;
  description: string;
  urlOverride?: string;
}

// Only used to enrich the "More projects" list — never the featured four.
// Keyed by the Vercel project name, not by title.
const vercelMoreEnrichment: Record<string, VercelMoreEnrichment> = {
  "norzah-e-commerce": {
    title: "NorZah E-Commerce",
    description:
      "Full-stack e-commerce engine with real-time cart state and a REST API on Express.js.",
    urlOverride: "https://norzah-e-commerce.norzah.dev",
  },
  "components-demo": {
    title: "Awesome Table Component",
    description:
      "Accessible React table with pagination, sorting, filtering and skeleton loaders.",
    urlOverride: "https://components-demo.norzah.dev/table",
  },
};

const manualMoreProjects: MoreProject[] = [
  {
    title: "NorZah Cinema",
    url: "https://cinema.norzah.dev/",
    description: "Responsive media discovery app powered by the TMDB API.",
  },
  {
    title: "NorZah CPRTask",
    url: "https://todo.norzah.dev/",
    description: "Zero-backend task manager using persistent browser LocalStorage.",
  },
  {
    title: "WordWave",
    url: "https://wordwave.norzah.dev/",
    description: "Real-time word, character and reading-time counter.",
  },
];

function mergeVercelMoreProjects(vercelProjects: VercelProject[]): MoreProject[] {
  return vercelProjects
    .filter((p) => vercelMoreEnrichment[p.name])
    .map((p) => {
      const enrich = vercelMoreEnrichment[p.name];
      return {
        title: enrich.title,
        url: enrich.urlOverride ?? p.url,
        description: enrich.description,
      };
    });
}

function Project() {
  const [moreFromVercel, setMoreFromVercel] = useState<MoreProject[]>([]);

  useEffect(() => {
    fetch("/api/vercel-projects")
      .then((r) => r.json())
      .then((data) => {
        if (data.projects) {
          setMoreFromVercel(mergeVercelMoreProjects(data.projects));
        }
      })
      // "More projects" must degrade gracefully: if this call fails, the
      // manual entries below still render and nothing breaks.
      .catch(() => {});
  }, []);

  const moreProjects = [...manualMoreProjects, ...moreFromVercel];

  return (
    <div className="projects-container" id="projects">
      <h1>Featured Work</h1>
      <div className="projects-grid">
        {featuredProjects.map((project) => (
          <div className="project-card" key={project.id}>
            {project.preview === "iframe" ? (
              <IframePreview
                src={project.url}
                title={`${project.title} preview`}
                href={project.url}
                label={`Open ${project.title}`}
              />
            ) : (
              <div className="static-preview">
                <img src={project.image} alt={project.title} />
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="project-preview-overlay"
                  aria-label={`Open ${project.title}`}
                />
              </div>
            )}
            <div className="project-info">
              <a href={project.url} target="_blank" rel="noreferrer">
                <h2>{project.title}</h2>
              </a>
              <p className="project-headline">{project.headline}</p>
              <dl className="project-breakdown">
                <div>
                  <dt>Problem</dt>
                  <dd>{project.problem}</dd>
                </div>
                <div>
                  <dt>What I built</dt>
                  <dd>{project.builtIt}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd className="project-status">{project.status}</dd>
                </div>
              </dl>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span className="project-tag" key={`${project.id}-${tag}`}>
                    {tag}
                  </span>
                ))}
              </div>
              <a className="project-link" href={project.url} target="_blank" rel="noreferrer">
                {project.linkLabel} &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>

      {moreProjects.length > 0 && (
        <div className="more-projects">
          <h3>More projects</h3>
          <ul className="more-projects-list">
            {moreProjects.map((project) => (
              <li key={project.title}>
                <a href={project.url} target="_blank" rel="noreferrer">
                  <span className="more-project-title">{project.title}</span>
                  <span className="more-project-desc">{project.description}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Project;
