import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import SectionTitle from '../molecules/SectionTitle.jsx';

const cardMotion = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.45 } };

const Projects = ({ projects }) => (
  <section id="projects" className="section">
    <SectionTitle eyebrow="Projects" title="Selected Work" />
    <div className="project-grid">
      {projects.map((project) => (
        <motion.article className="project-card" key={project._id} {...cardMotion}>
          <div className="project-image">{project.image?.url ? <img src={project.image.url} alt={project.title} /> : <span>{project.category}</span>}</div>
          <div className="project-content">
            {project.featured && <strong className="badge">Featured</strong>}
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="chips">{project.technologies?.map((tech) => <span key={tech}>{tech}</span>)}</div>
            <div className="card-actions">
              <a href={project.githubUrl || '#'}><FiGithub /> GitHub</a>
              <a href={project.liveUrl || '#'}><FiExternalLink /> Live Demo</a>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  </section>
);

export default Projects;
