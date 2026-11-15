import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faLaptopCode, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';

import '../assets/styles/Services.scss';

const services = [
  {
    icon: faRobot,
    title: "AI assistants for your documents",
    description:
      "A chatbot that answers staff or customer questions from your own policies, manuals and FAQs, in English and Swahili.",
  },
  {
    icon: faLaptopCode,
    title: "Web apps and dashboards",
    description:
      "Booking systems, portals, e-commerce and internal tools, built with Laravel, Django, React or Next.js.",
  },
  {
    icon: faScrewdriverWrench,
    title: "Maintenance and improvements",
    description:
      "A monthly plan to keep your existing system fast, secure and up to date.",
  },
];

function Services() {
  return (
    <div className="container" id="services">
      <div className="skills-container services-container">
        <h1>Services</h1>
        <div className="skills-grid">
          {services.map((service) => (
            <div className="skill" key={service.title}>
              <FontAwesomeIcon icon={service.icon} size="3x" />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
