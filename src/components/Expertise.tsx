import React from "react";
import '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faFlutter } from '@fortawesome/free-brands-svg-icons';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

import Chip from '@mui/material/Chip';
import '../assets/styles/Expertise.scss';

const webAppLabels = [
  "Laravel",
  "PHP",
  "Django",
  "Python",
  "React",
  "Next.js",
  "TypeScript",
  "PostgreSQL",
  "MySQL",
  "REST APIs",
  "Tailwind CSS",
];

const aiLabels = [
  "LLM API integration",
  "Retrieval over company documents (RAG)",
  "Bilingual English/Swahili interfaces",
  "Python",
];

const mobileDeployLabels = [
  "Flutter",
  "Dart",
  "Firebase",
  "Supabase",
  "Docker",
  "Vercel",
  "Linux",
];

function Expertise() {
    return (
        <div className="container" id="expertise">
            <div className="skills-container">
                <h1>Expertise</h1>
                <div className="skills-grid">
                    <div className="skill">
                        <FontAwesomeIcon icon={faReact} size="3x"/>
                        <h3>Web applications</h3>
                        <p>Custom web applications, dashboards and booking systems, from database design through to a polished, production-ready interface. Built with Laravel, Django or React/Next.js.</p>
                        <div className="flex-chips">
                            <span className="chip-title">Tech stack:</span>
                            {webAppLabels.map((label, index) => (
                                <Chip key={index} className='chip' label={label} />
                            ))}
                        </div>
                    </div>

                    <div className="skill">
                        <FontAwesomeIcon icon={faRobot} size="3x"/>
                        <h3>AI assistants and automation</h3>
                        <p>Chatbots and assistants that answer from your own policies, manuals and FAQs, integrated with LLM APIs and built to work in both English and Swahili.</p>
                        <div className="flex-chips">
                            <span className="chip-title">Tech stack:</span>
                            {aiLabels.map((label, index) => (
                                <Chip key={index} className='chip' label={label} />
                            ))}
                        </div>
                    </div>

                    <div className="skill">
                        <FontAwesomeIcon icon={faFlutter} size="3x"/>
                        <h3>Mobile and deployment</h3>
                        <p>Cross-platform mobile apps and reliable, containerized deployments, so your product reaches Android, iOS and the web and keeps running smoothly after launch.</p>
                        <div className="flex-chips">
                            <span className="chip-title">Tech stack:</span>
                            {mobileDeployLabels.map((label, index) => (
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
