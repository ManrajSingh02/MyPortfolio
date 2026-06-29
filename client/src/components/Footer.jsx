import { FiArrowUp, FiGithub, FiInstagram, FiLinkedin } from 'react-icons/fi';

const Footer = ({ profile }) => (
  <footer className="footer">
    <div>
      <h3>{profile?.name || 'Portfolio'}</h3>
      <p>Designed and built with React, Express, MongoDB and a quietly obsessive amount of polish.</p>
    </div>
    <div className="footer-links">
      <a href="/#projects">Projects</a>
      <a href="/#skills">Skills</a>
      <a href="/#contact">Contact</a>
      <a href="/admin/login">Admin Login</a>
    </div>
    <div className="socials">
      <a href={profile?.socials?.linkedin || '#'} aria-label="LinkedIn"><FiLinkedin /></a>
      <a href={profile?.socials?.github || '#'} aria-label="GitHub"><FiGithub /></a>
      <a href={profile?.socials?.instagram || '#'} aria-label="Instagram"><FiInstagram /></a>
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top" type="button"><FiArrowUp /></button>
    </div>
    <small>Copyright {new Date().getFullYear()} {profile?.name || 'Portfolio'}. All rights reserved.</small>
  </footer>
);

export default Footer;
