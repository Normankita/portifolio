import React from "react";
import '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faPython, faFlutter, faGitAlt, faDocker } from '@fortawesome/free-brands-svg-icons';
import { faNetworkWired, faServer, faShieldHalved } from '@fortawesome/free-solid-svg-icons';

import Chip from '@mui/material/Chip';
import '../assets/styles/Expertise.scss';

const labelsFirst = [
  "JavaScript",
  "TypeScript",
  "Python",
  "PHP",
  "React",
  "Next.js",
  "Django",
  "PostgreSQL",
  "MySQL",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Bootstrap",
  "MUI",
  "Vite",
  "Redux",
  "Laravel",
  "Yii2",
  "Firebase",
  "Git",
  "Postman",
  "RESTful API Integration",
  "Database Design & Management"
];

const labelsSecond = [
    "VLAN",
    "IEEE 802.1x",
    "Cisco Switch Configuration",
    "Active Directory",
    "RADIUS Server",
    "Linux",
    "Network Monitoring Tools"
];

const labelsThird = [
    "Machine Learning",
    "Data Processing",
    "Algorithms",
    "Python Libraries"
];

const labelsFourth = [
    "Flutter",
    "Dart",
    "Android",
    "iOS",
    "Desktop",
    "Web"
];

const labelsFifth = [
    "Git",
    "GitHub",
    "GitLab"
];

const labelsSixth = [
    "Firebase",
    "Supabase",
    "Node.js",
    "Express.js",
    "Django"
];

const labelsSeventh = [
    "Linux Server Administration",
    "Network Security",
    "Cisco CLI",
    "IEEE 802.1x"
];

const labelsEighth = [
    "Email Forensics & Header Analysis"
];

const labelsNinth = [
    "Docker",
    "Vercel"
];

function Expertise() {
    return (
        <div className="container" id="expertise">
            <div className="skills-container">
                <h1>Expertise</h1>
                <div className="skills-grid">
                    <div className="skill">
                        <FontAwesomeIcon icon={faReact} size="3x"/>
                        <h3>Programming & Web Development</h3>
                        <p>Full-stack developer focused on backend-heavy systems, database design, business logic, and integrations, while building clean, maintainable frontends. Comfortable across the stack from REST APIs to reactive UIs.</p>
                        <div className="flex-chips">
                            <span className="chip-title">Tech stack:</span>
                            {labelsFirst.map((label, index) => (
                                <Chip key={index} className='chip' label={label} />
                            ))}
                        </div>
                    </div>

                    <div className="skill">
                        <FontAwesomeIcon icon={faNetworkWired} size="3x"/>
                        <h3>Networking & Security</h3>
                        <p>Experienced in network administration with a strong background in configuring secure network protocols, VLAN technologies, and Cisco devices, optimizing security and performance.</p>
                        <div className="flex-chips">
                            <span className="chip-title">Tech stack:</span>
                            {labelsSecond.map((label, index) => (
                                <Chip key={index} className='chip' label={label} />
                            ))}
                        </div>
                    </div>

                    <div className="skill">
                        <FontAwesomeIcon icon={faPython} size="3x"/>
                        <h3>Machine Learning & Algorithms</h3>
                        <p>Familiar with fundamental machine learning algorithms and their practical implementation. I apply these algorithms to solve real-world problems, with hands-on experience in data processing and algorithm optimization.</p>
                        <div className="flex-chips">
                            <span className="chip-title">Tech stack:</span>
                            {labelsThird.map((label, index) => (
                                <Chip key={index} className='chip' label={label} />
                            ))}
                        </div>
                    </div>

                    <div className="skill">
                        <FontAwesomeIcon icon={faFlutter} size="3x"/>
                        <h3>Mobile & Cross-Platform Development</h3>
                        <p>Building Flutter applications that ship to Android, iOS, desktop, and web from a single Dart codebase, with a focus on consistent UI and native performance across targets.</p>
                        <div className="flex-chips">
                            <span className="chip-title">Tech stack:</span>
                            {labelsFourth.map((label, index) => (
                                <Chip key={index} className='chip' label={label} />
                            ))}
                        </div>
                    </div>

                    <div className="skill">
                        <FontAwesomeIcon icon={faGitAlt} size="3x"/>
                        <h3>Version Control & Collaboration</h3>
                        <p>Managing source control and collaborative workflows across teams, using branching strategies, code review, and CI-friendly practices to keep projects shippable.</p>
                        <div className="flex-chips">
                            <span className="chip-title">Tech stack:</span>
                            {labelsFifth.map((label, index) => (
                                <Chip key={index} className='chip' label={label} />
                            ))}
                        </div>
                    </div>

                    <div className="skill">
                        <FontAwesomeIcon icon={faServer} size="3x"/>
                        <h3>Backend & Backend-as-a-Service (BaaS)</h3>
                        <p>Designing APIs and server-side logic with Node.js, Express.js, and Django, and leaning on managed backends like Firebase and Supabase to move faster without sacrificing control.</p>
                        <div className="flex-chips">
                            <span className="chip-title">Tech stack:</span>
                            {labelsSixth.map((label, index) => (
                                <Chip key={index} className='chip' label={label} />
                            ))}
                        </div>
                    </div>

                    <div className="skill">
                        <FontAwesomeIcon icon={faNetworkWired} size="3x"/>
                        <h3>Infrastructure & Systems Administration</h3>
                        <p>Administering Linux servers and enterprise network infrastructure, including secure network design, Cisco CLI configuration, and 802.1x-based access control.</p>
                        <div className="flex-chips">
                            <span className="chip-title">Tech stack:</span>
                            {labelsSeventh.map((label, index) => (
                                <Chip key={index} className='chip' label={label} />
                            ))}
                        </div>
                    </div>

                    <div className="skill">
                        <FontAwesomeIcon icon={faShieldHalved} size="3x"/>
                        <h3>Specialized / Cybersecurity Tools</h3>
                        <p>Applying investigative techniques to trace email origin and authenticity, including header analysis and forensic review of message metadata.</p>
                        <div className="flex-chips">
                            <span className="chip-title">Tech stack:</span>
                            {labelsEighth.map((label, index) => (
                                <Chip key={index} className='chip' label={label} />
                            ))}
                        </div>
                    </div>

                    <div className="skill">
                        <FontAwesomeIcon icon={faDocker} size="3x"/>
                        <h3>DevOps & Deployment</h3>
                        <p>Containerizing services for consistent, portable deployments and shipping frontend/backend projects to production on Vercel.</p>
                        <div className="flex-chips">
                            <span className="chip-title">Tech stack:</span>
                            {labelsNinth.map((label, index) => (
                                <Chip key={index} className='chip' label={label} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Expertise;
