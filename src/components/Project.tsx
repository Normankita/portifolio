import { useEffect, useState } from "react";
import mock09 from "../assets/images/mock09.png";
import mock10 from "../assets/images/mock10.png";
import "../assets/styles/Project.scss";
import IframePreview from "./IframePreview";

interface ProjectData {
  title: string;
  url: string;
  description: string;
  tags: string[];
  preview: "iframe" | "image";
  image?: string;
}

interface VercelProject {
  id: string;
  name: string;
  framework: string | null;
  url: string;
}



interface VercelEnrichment {
  title: string;
  description: string;
  tags: string[];
  preview: "iframe" | "image";
  urlOverride?: string;
  image?: string;
}

// Metadata for each Vercel project — keyed by the Vercel project name.
// Add an entry here whenever you deploy something new to Vercel.
const vercelEnrichment: Record<string, VercelEnrichment> = {
  "norzah-e-commerce": {
    title: "NorZah E-Commerce",
    description:
      "Full-stack e-commerce engine with real-time cart state management, RESTful API endpoints built on Express.js, and structured product data pipelines.",
    tags: ["React", "Express.js", "Node.js"],
    preview: "iframe",
  },
  "components-demo": {
    title: "Awesome Table Component",
    description:
      "High-performance, accessible React table component with dynamic pagination, column sorting, client-side filtering, skeleton loaders, and custom row actions.",
    tags: ["React", "Tailwind CSS", "TypeScript"],
    preview: "iframe",
    urlOverride: "https://components-demo.norzah.dev/table",
  },
  "fyp-mzumbe": {
    title: "Mzumbe FYP Management Portal",
    description:
      "Enterprise project tracking and supervision portal for Mzumbe University featuring role-based access control and automated progress tracking with Django and PostgreSQL.",
    tags: ["React", "Django", "PostgreSQL"],
    preview: "iframe",
  },
};

// Projects not on Vercel — maintained manually.
const manualProjects: ProjectData[] = [
  {
    title: "NorZah Cinema",
    url: "https://cinema.norzah.dev/",
    description:
      "Responsive media discovery app powered by TMDB API. Implements client-side search caching, dynamic routing, and lazy-loaded image grids.",
    tags: ["React", "TMDB API", "CSS3"],
    preview: "iframe",
  },
  {
    title: "Harusi Kadi",
    url: "https://harusi.norzah.dev/",
    description:
      "Interactive wedding card generator and preview platform. Features real-time template customization, dynamic contribution tracking, and custom print/export-ready layouts.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "React"],
    preview: "iframe",
  },
  {
    title: "NorZah Kilimo Smart assist",
    url: "https://kilimo-ai.norzah.dev/",
    description:
      "AI-driven agricultural assistant built to provide localized crop advice, disease diagnosis, and smart farming insights for regional farmers.",
    tags: ["React", "TypeScript", "AI / LLM API", "Tailwind CSS"],
    preview: "iframe",
  },
  {
    title: "NorZah CPRTask",
    url: "https://todo.norzah.dev/",
    description:
      "Lightweight, zero-backend task management system utilizing persistent browser LocalStorage for offline state synchronization.",
    tags: ["React", "Local Storage"],
    preview: "iframe",
  },
  {
    title: "WordWave",
    url: "https://wordwave.norzah.dev/",
    description:
      "Real-time string parsing utility calculating live word, character, and reading-time metrics with zero external dependencies.",
    tags: ["JavaScript", "HTML5", "CSS3"],
    preview: "iframe",
  },
  {
    title: "Reservation System",
    url: "https://github.com/Normankita/TMH",
    description:
      "Multi-tenant booking and property management system handling real-time availability calendars and tenant scheduling using Yii2 MVC and MySQL.",
    tags: ["PHP", "Yii2", "MySQL"],
    preview: "image",
    image: mock09,
  },
  {
    title: "IEEE 802.1x Implementation",
    url: "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/sec_usr_8021x/configuration/15-mt/sec-user-8021x-15-mt-book.pdf",
    description:
      "Enterprise network access control (NAC) deployment integrating IEEE 802.1x, RADIUS AAA authentication, Cisco switch port security, and Active Directory VLAN assignment.",
    tags: ["Cisco", "RADIUS", "Active Directory"],
    preview: "image",
    image: mock10,
  },
];

function mergeVercelProjects(vercelProjects: VercelProject[]): ProjectData[] {
  return vercelProjects
    .filter((p) => vercelEnrichment[p.name])
    .map((p) => {
      const enrich = vercelEnrichment[p.name];
      return {
        title: enrich.title,
        url: enrich.urlOverride ?? p.url,
        description: enrich.description,
        tags: enrich.tags,
        preview: enrich.preview,
        image: enrich.image,
      };
    });
}

function ProjectSkeleton() {
  return (
    <div className="project-card skeleton-card">
      <div className="skeleton-preview" />
      <div className="project-info">
        <div className="skeleton-line skeleton-title" />
        <div className="skeleton-line" />
        <div className="skeleton-line skeleton-short" />
        <div className="project-tags">
          <span className="skeleton-tag" />
          <span className="skeleton-tag" />
        </div>
      </div>
    </div>
  );
}

function Project() {
  const [vercelProjects, setVercelProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/vercel-projects")
      .then((r) => r.json())
      .then((data) => {
        if (data.projects) {
          setVercelProjects(mergeVercelProjects(data.projects));
        }
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const allProjects = [...vercelProjects, ...manualProjects];

  return (
    <div className="projects-container" id="projects">
      <h1>Personal Projects</h1>
      <div className="projects-grid">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <ProjectSkeleton key={i} />)
          : allProjects.map((project, index) => (
            <div className="project-card" key={`${project.title}-${index}`}>
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
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span className="project-tag" key={`${project.title}-${tag}-${tagIndex}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Project;
