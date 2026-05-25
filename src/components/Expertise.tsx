import React from "react";
import '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faPython } from '@fortawesome/free-brands-svg-icons';
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons';

import Chip from '@mui/material/Chip';
import '../assets/styles/Expertise.scss';

const labelsFirst = [
  "JavaScript",
  "Python",
  "PHP",
  "React",
  "Django",
  "PostgreSQL",
  "MySQL",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
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

function Expertise() {
    return (
        <div className="container" id="expertise">
            <div className="skills-container">
                <h1>Expertise</h1>
                <div className="skills-grid">
                    <div className="skill">
                        <FontAwesomeIcon icon={faReact} size="3x"/>
                        <h3>Programming & Web Development</h3>
                        <p>Full-stack developer focused on backend-heavy systems — database design, business logic, and integrations — while building clean, maintainable frontends. Comfortable across the stack from REST APIs to reactive UIs.</p>
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
                </div>
            </div>
        </div>
    );
}

export default Expertise;
