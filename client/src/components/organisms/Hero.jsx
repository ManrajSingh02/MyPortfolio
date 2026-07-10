import { motion } from 'framer-motion';
import { FiDownload, FiMail, FiUser } from 'react-icons/fi';
import Button from '../atoms/Button.jsx';

const Hero = ({ profile, resume, onOpenResume }) => {
  const heroPhoto = profile.photo?.url;

  return (
    <section id="home" className="hero-section">
      <div className="animated-bg"><span /><span /><span /></div>
      <div className="hero-content">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <span className="eyebrow">{profile.role}</span>
          <h1>{profile.name}</h1>
          <p className="typing">{profile.typingRoles?.join('  |  ')}</p>
          <p>{profile.bio}</p>
          <div className="hero-actions">
            <Button icon={FiDownload} onClick={onOpenResume} disabled={!resume?.url}>Download Resume</Button>
            <Button href="#contact" variant="secondary" icon={FiMail}>Contact Me</Button>
          </div>
        </motion.div>
        <motion.div className="hero-photo" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="hero-photo-frame">
            {heroPhoto ? (
              <img src={heroPhoto} alt={profile.name} />
            ) : (
              <div className="hero-photo-placeholder">
                <FiUser />
                <span>Your photo</span>
                <small>JPG, PNG or WebP</small>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
