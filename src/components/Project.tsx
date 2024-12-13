import React from "react";
import mock01 from '../assets/images/mock01.png';
import mock06 from '../assets/images/mock06.png';
import mock07 from '../assets/images/mock07.png';
import mock08 from '../assets/images/mock08.png';
import mock09 from '../assets/images/mock09.png';
import mock10 from '../assets/images/mock10.png';
import '../assets/styles/Project.scss';

function Project() {
    return(
    <div className="projects-container" id="projects">
        <h1>Personal Projects</h1>
        <div className="projects-grid">
            <div className="project">
                <a href="https://github.com/norman-kita/ieee-802.1x-implementation" target="_blank" rel="noreferrer"><img src={mock10} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://github.com/norman-kita/ieee-802.1x-implementation" target="_blank" rel="noreferrer"><h2>IEEE 802.1x Implementation</h2></a>
                <p>Developed and tested a secure port-based authentication protocol for VLANs using Cisco switches and Active Directory.</p>
            </div>
            <div className="project">
                <a href="https://github.com/Normankita/TMH" target="_blank" rel="noreferrer"><img src={mock09} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://github.com/norman-kita/reservation-system" target="_blank" rel="noreferrer"><h2>Reservation System</h2></a>
                <p>Created a booking and reservation system for an apartment business using PHP, Yii Framework, and MySQL database integration.</p>
            </div>
            <div className="project">
                <a href="https://norzahcinema.netlify.app/" target="_blank" rel="noreferrer"><img src={mock08} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://github.com/norman-kita/laravel-intro-project" target="_blank" rel="noreferrer"><h2>NorZah Cinema</h2></a>
                <p>Integrates the TMDB API for dynamic movie and TV show data fetching, including search and trending features. It uses a responsive design for a seamless user experience across devices. React efficiently manages state and renders content without reloading, enhancing interactivity and performance..</p>
            </div>
            <div className="project">
                <a href="https://github.com/norman-kita/cybersecurity-tools" target="_blank" rel="noreferrer"><img src={mock07} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://github.com/norman-kita/cybersecurity-tools" target="_blank" rel="noreferrer"><h2>NorZah CPRTask</h2></a>
                <p>Web app to help you track your schedules and daily activities so you don't miss out any. utilizez local storage and state management utilities</p>
            </div>
            <div className="project">
                <a href="https://github.com/norman-kita/data-visualization-dashboard" target="_blank" rel="noreferrer"><img src={mock06} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://github.com/norman-kita/data-visualization-dashboard" target="_blank" rel="noreferrer"><h2>NorZah E-Commerce</h2></a>
                <p>Created a real-time E-commerce web application to demonstrate online purchases, powered by react and expressjs.</p>
            </div>
            <div className="project">
                <a href="https://github.com/norman-kita/data-visualization-dashboard" target="_blank" rel="noreferrer"><img src={mock01} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://github.com/norman-kita/data-visualization-dashboard" target="_blank" rel="noreferrer"><h2>Word Counter</h2></a>
                <p>Created a real-time copy and paste or write your own editor that helps you count words and characters within text</p>
            </div>
        </div>
    </div>
    );
}

export default Project;
