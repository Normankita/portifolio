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
  "norzah-ecommerce": {
    title: "NorZah E-Commerce",
    description:
      "Full-stack e-commerce platform with product listings, cart management, and a checkout flow. Built with React on the frontend and Express.js on the backend.",
    tags: ["React", "Express.js", "Node.js"],
    preview: "iframe",
  },
  "components-demo-hazel": {
    title: "Awesome Table Component",
    description:
      "A reusable, responsive React table component built with Tailwind CSS. Includes search, sorting, pagination, skeleton loading, and optional per-row actions — ideal for data-rich dashboards.",
    tags: ["React", "Tailwind CSS", "TypeScript"],
    preview: "iframe",
    urlOverride: "https://components-demo-hazel.vercel.app/table",
  },
  "fyp-mzumbe": {
    title: "Mzumbe FYP Management Portal",
    description:
      "Online submission and tracking portal for final-year projects at Mzumbe University. Streamlines supervision workflows and progress reporting for students and supervisors.",
    tags: ["React", "Django", "PostgreSQL"],
    preview: "iframe",
  },
};

// Projects not on Vercel — maintained manually.
const manualProjects: ProjectData[] = [
  {
    title: "NorZah Cinema",
    url: "https://norzahcinema.netlify.app/",
    description:
      "Movie and TV discovery app powered by the TMDB API. Features real-time search, trending content, and a fully responsive UI — built with React for fast, reload-free navigation.",
    tags: ["React", "TMDB API", "CSS3"],
    preview: "iframe",
  },
  {
    title: "NorZah CPRTask",
    url: "https://norzah-todo.netlify.app/",
    description:
      "Task management app for tracking schedules and daily activities. Uses local storage for persistence so your data survives page refreshes — no account needed.",
    tags: ["React", "Local Storage"],
    preview: "iframe",
  },
  {
    title: "Word Counter",
    url: "https://wordcount-norzah.netlify.app/",
    description:
      "Lightweight editor that counts words and characters in real time as you type or paste text — useful for writing within limits.",
    tags: ["JavaScript", "HTML5", "CSS3"],
    preview: "iframe",
  },
  {
    title: "Reservation System",
    url: "https://github.com/Normankita/TMH",
    description:
      "Booking and reservation system for an apartment business — handles availability, tenant management, and scheduling. Built with PHP, Yii Framework, and MySQL.",
    tags: ["PHP", "Yii2", "MySQL"],
    preview: "image",
    image: mock09,
  },
  {
    title: "IEEE 802.1x Implementation",
    url: "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/sec_usr_8021x/configuration/15-mt/sec-user-8021x-15-mt-book.pdf",
    description:
      "Designed and tested a port-based network access control system using IEEE 802.1x, RADIUS, Cisco switches, and Active Directory — enforcing authenticated access per VLAN.",
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
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const allProjects = [...vercelProjects, ...manualProjects];

  return (
    <div className="projects-container" id="projects">
      <h1>Personal Projects</h1>
      <div className="projects-grid">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <ProjectSkeleton key={i} />)
          : allProjects.map((project) => (
              <div className="project-card" key={project.title}>
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
                    {project.tags.map((tag) => (
                      <span className="project-tag" key={tag}>
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
