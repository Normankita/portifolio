import React from "react";
import '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../assets/styles/Timeline.scss';

const iconStyle = { background: '#5000ca', color: '#fff' };

function Timeline() {
  return (
    <div id="history">
      <div className="items-container">
        <h1>Career History</h1>
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="July 2025 – Present"
            iconStyle={iconStyle}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">ICT Officer</h3>
            <h4 className="vertical-timeline-element-subtitle">PSSSF HQ</h4>
            <p>
              Delivering IT solutions and maintaining critical systems supporting the organization's daily operations. Focused on system integration, reliability, and process automation.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="March 2025 – June 2025"
            iconStyle={iconStyle}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Software Developer</h3>
            <h4 className="vertical-timeline-element-subtitle">TodaySky</h4>
            <p>
              Designed and shipped production features, translating business requirements into robust, maintainable code. Contributed across the stack from API design to frontend implementation.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="January 2025 – February 2025"
            iconStyle={iconStyle}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">IT Client Support Officer</h3>
            <h4 className="vertical-timeline-element-subtitle">Perfect Infotech International LTD</h4>
            <p>
              Provided technical support to clients, diagnosing and resolving hardware, software, and connectivity issues efficiently while maintaining a high standard of service quality.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="July 2023 – September 2023"
            iconStyle={iconStyle}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">ICT Network Admin (Trainee)</h3>
            <h4 className="vertical-timeline-element-subtitle">PSSSF HQ, Dodoma</h4>
            <p>
              Configured and maintained VLAN segmentation and IEEE 802.1x port-based authentication across Cisco infrastructure, strengthening network security and access control.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="September 2023 – October 2023"
            iconStyle={iconStyle}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">ICT Developer (Trainee)</h3>
            <h4 className="vertical-timeline-element-subtitle">PSSSF HQ, Dodoma</h4>
            <p>
              Developed internal tools using PHP, Yii Framework, and Laravel — gaining hands-on experience in MVC architecture, ORM, and enterprise application patterns.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="July 2022 – September 2022"
            iconStyle={iconStyle}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Cybersecurity & Digital Forensics (Practical Training)</h3>
            <h4 className="vertical-timeline-element-subtitle">University of Dodoma</h4>
            <p>
              Conducted penetration testing exercises, network security analysis, and email forensics investigations. Built foundational skills in threat identification and incident response.
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;
