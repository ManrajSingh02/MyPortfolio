import { FiArrowUp, FiGithub, FiLinkedin } from 'react-icons/fi';

const Footer = ({ profile }) => (
  <footer className="footer">
    <div>
      <h3>{profile?.name || 'Portfolio'}</h3>
      <p>Designed and built with React and a quietly obsessive amount of polish.</p>
    </div>
    <div className="footer-links">
      <a href="/#projects">Projects</a>
      <a href="/#skills">Skills</a>
      <a href="/#contact">Contact</a>
    </div>
    <div className="socials">
      <a href={profile?.socials?.linkedin || '#'} aria-label="LinkedIn"><FiLinkedin /></a>
      <a href={profile?.socials?.github || '#'} aria-label="GitHub"><FiGithub /></a>
      <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top" type="button"><FiArrowUp /></button>
    </div>
    <small>Copyright {new Date().getFullYear()} {profile?.name || 'Portfolio'}. All rights reserved.</small>
  </footer>
);

export default Footer;
