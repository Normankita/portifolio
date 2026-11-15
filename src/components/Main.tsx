import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import '../assets/styles/Main.scss';
import dp from '../assets/images/dp.jpg';

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
          <div className="hero-grid">
            <div className="content">
              {socialLinks('social_icons')}
              <p className="tagline">Norman Kita &middot; Full-Stack Developer</p>
              <h1>I build web apps and AI assistants for businesses, in English and Swahili.</h1>
              <p className="bio">
                Full-stack developer based in Tanzania. From idea to a live
                product in weeks, at a fixed price.
              </p>
              <div className="hero-cta">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => scrollToSection('projects')}
                >
                  See my work
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => scrollToSection('contact')}
                >
                  Start a project
                </button>
              </div>
              {socialLinks('mobile_social_icons')}
            </div>

            <div className="hero-right">
              <div className="image-wrapper">
                <img src={dp} alt="Norman Kita" />
              </div>

              <div className="term-card" aria-hidden="true">
                <div className="term-bar">
                  <span className="term-dot" />
                  <span className="term-dot" />
                  <span className="term-dot" />
                  <span className="term-title">developer.ts</span>
                </div>
                <div className="term-body">
                  <div className="term-line">
                    <span className="tk-kw">const</span>{' '}
                    <span className="tk-var">norman</span>{' '}
                    <span className="tk-op">=</span> {'{'}
                  </div>
                  <div className="term-line term-indent">
                    <span className="tk-key">role</span>:{' '}
                    <span className="tk-str">'Full-Stack Dev'</span>,
                  </div>
                  <div className="term-line term-indent">
                    <span className="tk-key">focus</span>:{' '}
                    <span className="tk-str">'web apps · AI assistants · mobile'</span>,
                  </div>
                  <div className="term-line term-indent">
                    <span className="tk-key">stack</span>:{' '}
                    <span className="tk-str">'Laravel · Django · React · Next.js'</span>,
                  </div>
                  <div className="term-line term-indent">
                    <span className="tk-key">availableForProjects</span>:{' '}
                    <span className="tk-bool">true</span>,
                  </div>
                  <div className="term-line">
                    {'}'};<span className="term-cursor" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
