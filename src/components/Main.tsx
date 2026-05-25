import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import '../assets/styles/Main.scss';
import dp from '../assets/images/dp.jpg';
import SpotifyWidget from './SpotifyWidget';

interface Props {
  mode: string;
}

function Main({ mode }: Props) {
  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          <img src={dp} alt="Avatar" />
        </div>
        <div className="content">
          <div className="social_icons">
            <a href="https://github.com/Normankita" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/norman-kita-aa6499207/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
            <a href="https://wa.me/+255621381584" target="_blank" rel="noreferrer"><WhatsAppIcon/></a>
          </div>
          <h1>Norman Kita</h1>
          <p className="tagline">Full-Stack Developer</p>
          <p className="bio">
            Building reliable, data-intensive systems at <strong>PSSSF HQ</strong>.
            Focused on backend architecture, database design, and bridging complexity with clean interfaces.
            Currently sharpening skills in system design, performance optimization, and algorithms.
          </p>
          <div className="mobile_social_icons">
            <a href="https://github.com/Normankita" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/norman-kita-aa6499207/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
            <a href="https://wa.me/+255621381584" target="_blank" rel="noreferrer"><WhatsAppIcon/></a>
          </div>
        </div>
      </div>
      <div className="spotify-section">
        <SpotifyWidget mode={mode} />
      </div>
    </div>
  );
}

export default Main;
