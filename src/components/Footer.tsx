import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import '../assets/styles/Footer.scss'

function Footer() {
  return (
    <footer>
      <div>
        <a href="https://github.com/Normankita" target="_blank" rel="noreferrer"><GitHubIcon/></a>
        <a href="https://www.linkedin.com/in/norman-kita-aa6499207/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
      </div>
      <a href="https://wa.me/+255621381584" target="_blank" rel="noreferrer"><WhatsAppIcon/></a>
      <p>A portfolio designed & built by <a href="https://github.com/Normankita/portifolio" target="_blank" rel="noreferrer">Norman Kita</a> with 💜</p>
    </footer>
  );
}

export default Footer;