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

const projects: ProjectData[] = [
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
    title: "NorZah E-Commerce",
    url: "https://norzah-ecommerce.vercel.app/",
    description:
      "Full-stack e-commerce platform with product listings, cart management, and a checkout flow. Built with React on the frontend and Express.js on the backend.",
    tags: ["React", "Express.js", "Node.js"],
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
    title: "Awesome Table Component",
    url: "https://components-demo-hazel.vercel.app/table",
    description:
      "A reusable, responsive React table component built with Tailwind CSS. Includes search, sorting, pagination, skeleton loading, and optional per-row actions — ideal for data-rich dashboards.",
    tags: ["React", "Tailwind CSS", "TypeScript"],
    preview: "iframe",
  },
  {
    title: "Mzumbe FYP Management Portal",
    url: "https://fyp-mzumbe.vercel.app/",
    description:
      "Online submission and tracking portal for final-year projects at Mzumbe University. Streamlines supervision workflows and progress reporting for students and supervisors.",
    tags: ["React", "Django", "PostgreSQL"],
    preview: "iframe",
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

function Project() {
  return (
    <div className="projects-container" id="projects">
      <h1>Personal Projects</h1>
      <div className="projects-grid">
        {projects.map((project) => (
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
                  <span className="project-tag" key={tag}>{tag}</span>
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
