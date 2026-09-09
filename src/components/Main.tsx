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

const socials = [
  { href: 'https://github.com/Normankita', label: 'GitHub', Icon: GitHubIcon },
  { href: 'https://www.linkedin.com/in/norman-kita-aa6499207/', label: 'LinkedIn', Icon: LinkedInIcon },
  { href: 'https://wa.me/+255621381584', label: 'WhatsApp', Icon: WhatsAppIcon },
];

function Main({ mode }: Props) {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const socialLinks = (className: string) => (
    <div className={className}>
      {socials.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          title={label}
        >
          <Icon />
        </a>
      ))}
    </div>
  );

  return (
    <div className="container">
      <div className="about-section">
        <div className="hero-inner">
          <div className="profile-container">
            <div className="image-wrapper">
              <img src={dp} alt="Norman Kita" />
            </div>
            <div className="content">
              {socialLinks('social_icons')}
              <h1>Norman Kita</h1>
              <p className="tagline">Full-Stack Developer</p>
              <p className="bio">
                Building reliable, data-intensive systems for large-scale financial
                platforms. Focused on backend architecture, database design, and
                bridging complexity with clean interfaces &mdash; with growing depth
                in system design, performance, and algorithms.
              </p>
              <div className="hero-cta">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => scrollToSection('projects')}
                >
                  View Projects
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => scrollToSection('contact')}
                >
                  Get in touch
                </button>
              </div>
              {socialLinks('mobile_social_icons')}
            </div>
          </div>
          <div className="spotify-float-section">
            <SpotifyWidget />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
