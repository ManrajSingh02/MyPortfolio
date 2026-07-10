import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiDownload, FiExternalLink, FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import Button from '../components/atoms/Button.jsx';
import Modal from '../components/molecules/Modal.jsx';
import SectionTitle from '../components/molecules/SectionTitle.jsx';
import Footer from '../components/organisms/Footer.jsx';
import Hero from '../components/organisms/Hero.jsx';
import Projects from '../components/organisms/Projects.jsx';
import { usePortfolio } from '../context/portfolioContext.jsx';
import { formatDate } from '../utils/format.js';

const cardMotion = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.45 } };
const apiBaseUrl = import.meta.env.DEV
  ? ''
  : (import.meta.env.VITE_API_URL || '').trim().replace(/\/+$/, '').replace(/\/api$/, '');

const Home = () => {
  const data = usePortfolio();
  const [preview, setPreview] = useState(null);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [contactStatus, setContactStatus] = useState({ type: '', message: '' });
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  const projects = data?.projects || [];
  const certificates = data?.certificates || [];
  const skills = data?.skills || [];
  const profile = data?.profile;

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

  const onSubmit = async (values) => {
    setContactStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      const responseText = await response.text();
      let result = {};

      if (responseText) {
        try {
          result = JSON.parse(responseText);
        } catch {
          result = {};
        }
      }

      if (!response.ok) {
        throw new Error(result.message || 'Email service is unavailable. Please try again later or email me directly.');
      }

      reset();
      setContactStatus({ type: 'success', message: 'Message sent successfully.' });
    } catch (error) {
      setContactStatus({ type: 'error', message: error.message || 'Email service is unavailable. Please try again later or email me directly.' });
    }
  };

  return (
    <main>
      <Hero profile={profile} resume={data.resume} onOpenResume={() => setResumeModalOpen(true)} />

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
                  <span>{item.duration || `${formatDate(item.startDate)} - ${item.current ? 'Present' : formatDate(item.endDate)}`}</span>
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

      <Projects projects={projects} />

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
            <Button type="submit" icon={FiSend} disabled={isSubmitting}>
              {isSubmitting ? 'Sending…' : 'Send Message'}
            </Button>
            {contactStatus.message && (
              <p className={`form-status ${contactStatus.type}`} role="status">{contactStatus.message}</p>
            )}
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
