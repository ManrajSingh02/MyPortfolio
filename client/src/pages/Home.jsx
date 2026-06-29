import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiDownload, FiExternalLink, FiGithub, FiMail, FiMapPin, FiPhone, FiSend, FiUser } from 'react-icons/fi';
import Button from '../components/common/Button.jsx';
import Loader from '../components/common/Loader.jsx';
import Modal from '../components/common/Modal.jsx';
import SectionTitle from '../components/common/SectionTitle.jsx';
import Footer from '../components/Footer.jsx';
import { usePortfolio } from '../hooks/usePortfolio.js';
import { formatDate } from '../utils/format.js';

const cardMotion = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.45 } };

const Home = () => {
  const { data, loading } = usePortfolio();
  const [preview, setPreview] = useState(null);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const { register, handleSubmit } = useForm();

  const projects = data?.projects || [];
  const certificates = data?.certificates || [];
  const skills = data?.skills || [];
  const profile = data?.profile;
  const heroPhoto = profile?.photo?.url;

  const downloadResume = () => {
    const url = data?.resume?.url;
    if (!url) return;

    const link = document.createElement('a');
    link.href = url;
    link.download = data?.resume?.title || 'resume.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const onSubmit = (values) => {
    const subject = values.subject || `Portfolio enquiry from ${values.name}`;
    const body = `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  };

  if (loading) return <Loader fullScreen />;

  return (
    <main>
      <section id="home" className="hero-section">
        <div className="animated-bg"><span /><span /><span /></div>
        <div className="hero-content">
          <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <span className="eyebrow">{profile.role}</span>
            <h1>{profile.name}</h1>
            <p className="typing">{profile.typingRoles?.join('  |  ')}</p>
            <p>{profile.bio}</p>
            <div className="hero-actions">
              <Button icon={FiDownload} onClick={() => setResumeModalOpen(true)} disabled={!data?.resume?.url}>Download Resume</Button>
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

      <section id="about" className="section">
        <SectionTitle eyebrow="About" title="Career Objective">{profile.careerObjective}</SectionTitle>
        <div className="split-grid">
          <motion.div className="glass-panel" {...cardMotion}>
            <h3>Education Timeline</h3>
            <div className="timeline">
              {data.education.map((item) => (
                <article key={item._id}>
                  <span>{item.startYear} - {item.endYear}</span>
                  <h4>{item.degree}</h4>
                  <p>{item.institution} {item.score ? `- ${item.score}` : ''}</p>
                  <small>{item.description}</small>
                </article>
              ))}
            </div>
          </motion.div>
          <motion.div className="glass-panel" {...cardMotion}>
            <h3>Experience</h3>
            <div className="timeline">
              {data.experience.map((item) => (
                <article key={item._id}>
                  <span>{formatDate(item.startDate)} - {item.current ? 'Present' : formatDate(item.endDate)}</span>
                  <h4>{item.role}</h4>
                  <p>{item.company} - {item.type}</p>
                  <small>{item.description}</small>
                </article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="skills" className="section alt-section">
        <SectionTitle eyebrow="Skills" title="Technical and soft skills">A practical mix of development knowledge and collaboration skills.</SectionTitle>
        <div className="skill-grid">
          {skills.map((skill) => (
            <motion.article className="skill-card" key={skill._id} {...cardMotion}>
              <div className="circle-progress" style={{ '--value': `${skill.level * 3.6}deg` }}><span>{skill.level}%</span></div>
              <h3>{skill.name}</h3>
              <p>{skill.category}</p>
              <div className="bar"><span style={{ width: `${skill.level}%` }} /></div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="projects" className="section">
        <SectionTitle eyebrow="Projects" title="Selected Work" />
        <div className="project-grid">
          {projects.map((project) => (
            <motion.article className="project-card" key={project._id} {...cardMotion}>
              <div className="project-image">{project.image?.url ? <img src={project.image.url} alt={project.title} /> : <span>{project.category}</span>}</div>
              <div>
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

      <section id="certificates" className="section alt-section">
        <SectionTitle eyebrow="Certificates" title="Credentials">Preview and download certificate assets.</SectionTitle>
        <div className="card-grid">
          {certificates.map((certificate) => (
            <motion.article className="mini-card" key={certificate._id} {...cardMotion}>
              <div className="certificate-thumb" onClick={() => setPreview(certificate)}>{certificate.image?.url ? <img src={certificate.image.url} alt={certificate.name} /> : certificate.organization}</div>
              <h3>{certificate.name}</h3>
              <p>{certificate.organization}</p>
              <small>{formatDate(certificate.issueDate)}</small>
              <div className="card-actions">
                <a href={certificate.credentialUrl || '#'}><FiExternalLink /> Credential</a>
                <a href={certificate.pdf?.url || certificate.image?.url || '#'} download><FiDownload /> Download</a>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <SectionTitle eyebrow="Contact" title="Let’s build something useful" />
        <div className="contact-grid">
          <div className="contact-list">
            <p><FiMail /> <a href={`mailto:${profile.email}`}>{profile.email}</a></p>
            <p><FiPhone /> {profile.phone}</p>
            <p><FiMapPin /> {profile.location}</p>
          </div>
          <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
            <input {...register('name', { required: true })} placeholder="Name" />
            <input {...register('email', { required: true })} type="email" placeholder="Email" />
            <input {...register('subject')} placeholder="Subject" />
            <textarea {...register('message', { required: true })} placeholder="Message" rows="5" />
            <Button type="submit" icon={FiSend}>Continue in Gmail</Button>
          </form>
        </div>
      </section>

      <Footer profile={profile} />
      <Modal open={Boolean(preview)} title={preview?.name} onClose={() => setPreview(null)}>
        {preview?.image?.url ? (
          <img className="preview-image" src={preview.image.url} alt={preview.name} />
        ) : preview?.pdf?.url ? (
          <iframe className="certificate-pdf-preview" src={preview.pdf.url} title={`${preview.name} preview`} />
        ) : (
          <p>{preview?.organization}</p>
        )}
      </Modal>
      <Modal open={resumeModalOpen} title={data?.resume?.title || 'Resume'} onClose={() => setResumeModalOpen(false)} panelClassName="resume-modal">
        <iframe className="resume-modal-preview" src={data?.resume?.url} title="Resume preview" />
        <div className="resume-modal-actions">
          <Button icon={FiDownload} onClick={downloadResume}>Download Resume</Button>
        </div>
      </Modal>
    </main>
  );
};

export default Home;
