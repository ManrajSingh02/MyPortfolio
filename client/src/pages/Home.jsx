import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiDownload, FiExternalLink, FiGithub, FiMail, FiMapPin, FiPhone, FiPlus, FiSend, FiTrash2, FiUpload, FiUser } from 'react-icons/fi';
import Button from '../components/common/Button.jsx';
import Loader from '../components/common/Loader.jsx';
import Modal from '../components/common/Modal.jsx';
import SectionTitle from '../components/common/SectionTitle.jsx';
import Footer from '../components/Footer.jsx';
import { usePortfolio } from '../hooks/usePortfolio.js';
import { formatDate } from '../utils/format.js';
import { sendMessage, trackResumeDownload } from '../services/portfolioService.js';
import api from '../services/api.js';

const cardMotion = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.45 } };

const Home = () => {
  const { data, loading } = usePortfolio();
  const [preview, setPreview] = useState(null);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState('');
  const [managedProjects, setManagedProjects] = useState(null);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [managedCertificates, setManagedCertificates] = useState(null);
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);
  const [certificateToDelete, setCertificateToDelete] = useState(null);
  const photoInputRef = useRef(null);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();
  const {
    register: registerProject,
    handleSubmit: handleProjectSubmit,
    reset: resetProject,
    formState: { isSubmitting: isSavingProject }
  } = useForm();
  const {
    register: registerCertificate,
    handleSubmit: handleCertificateSubmit,
    reset: resetCertificate,
    formState: { isSubmitting: isSavingCertificate }
  } = useForm();

  const projects = managedProjects || data?.projects || [];
  const certificates = managedCertificates || data?.certificates || [];
  const skills = data?.skills || [];
  const profile = data?.profile;
  const heroPhoto = uploadedPhoto || profile?.photo?.url;
  const canManageContent = Boolean(localStorage.getItem('portfolio_token'));

  const choosePhoto = () => {
    photoInputRef.current?.click();
  };

  const uploadPhoto = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadedPhoto(URL.createObjectURL(file));
    event.target.value = '';
  };

  const openProjectForm = () => {
    resetProject({ featured: false });
    setProjectModalOpen(true);
  };

  const createProject = async (values) => {
    const payload = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === 'image' && value?.[0]) payload.append('image', value[0]);
      else if (key !== 'image') payload.append(key, value);
    });

    try {
      const response = await api.post('/projects', payload);
      setManagedProjects((current) => [response.data, ...(current || data?.projects || [])]);
      setProjectModalOpen(false);
      resetProject();
    } catch {
      alert('Project could not be added. Please sign in again or check the server.');
    }
  };

  const deleteProject = async () => {
    try {
      await api.delete(`/projects/${projectToDelete._id}`);
      setManagedProjects((current) => (current || data?.projects || []).filter((item) => item._id !== projectToDelete._id));
      setProjectToDelete(null);
    } catch {
      alert('Project could not be deleted. Please sign in again or check the server.');
    }
  };

  const openCertificateForm = () => {
    resetCertificate();
    setCertificateModalOpen(true);
  };

  const createCertificate = async (values) => {
    const asset = values.asset?.[0];
    const payload = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key !== 'asset') payload.append(key, value);
    });
    if (asset) payload.append(asset.type === 'application/pdf' ? 'pdf' : 'image', asset);

    try {
      const response = await api.post('/certificates', payload);
      setManagedCertificates((current) => [response.data, ...(current || data?.certificates || [])]);
      setCertificateModalOpen(false);
      resetCertificate();
    } catch {
      alert('Certificate could not be added. Please sign in again or check the server.');
    }
  };

  const deleteCertificate = async () => {
    try {
      await api.delete(`/certificates/${certificateToDelete._id}`);
      setManagedCertificates((current) => (current || data?.certificates || []).filter((item) => item._id !== certificateToDelete._id));
      setCertificateToDelete(null);
    } catch {
      alert('Certificate could not be deleted. Please sign in again or check the server.');
    }
  };

  const downloadResume = async () => {
    const response = await trackResumeDownload().catch(() => null);
    const url = response?.data?.url || data?.resume?.url;
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
    await sendMessage(values);
    reset();
    alert('Message sent successfully.');
  };

  if (loading) return <Loader fullScreen />;

  return (
    <main>
      <section id="home" className="hero-section">
        <div className="animated-bg"><span /><span /><span /></div>
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
          <input ref={photoInputRef} className="visually-hidden" type="file" accept="image/*" onChange={uploadPhoto} />
          <Button className="hero-photo-upload" variant="secondary" icon={FiUpload} onClick={choosePhoto}>
            {heroPhoto ? 'Change Photo' : 'Upload Photo'}
          </Button>
        </motion.div>
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
        <SectionTitle eyebrow="Skills" title="Technical and soft skills">Progress indicators are editable from the CMS.</SectionTitle>
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
        <div className="section-heading-row">
          <SectionTitle eyebrow="Projects" title="Selected Work" />
          {canManageContent && <Button icon={FiPlus} onClick={openProjectForm}>Add Project</Button>}
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <motion.article className="project-card" key={project._id} {...cardMotion}>
              {canManageContent && (
                <button className="project-delete" type="button" onClick={() => setProjectToDelete(project)} aria-label={`Delete ${project.title}`}>
                  <FiTrash2 />
                </button>
              )}
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
        <div className="section-heading-row">
          <SectionTitle eyebrow="Certificates" title="Credentials">Preview and download certificate assets.</SectionTitle>
          {canManageContent && <Button icon={FiPlus} onClick={openCertificateForm}>Add Certificate</Button>}
        </div>
        <div className="card-grid">
          {certificates.map((certificate) => (
            <motion.article className="mini-card" key={certificate._id} {...cardMotion}>
              {canManageContent && (
                <button className="project-delete" type="button" onClick={() => setCertificateToDelete(certificate)} aria-label={`Delete ${certificate.name}`}>
                  <FiTrash2 />
                </button>
              )}
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
            <p><FiMail /> {profile.email}</p>
            <p><FiPhone /> {profile.phone}</p>
            <p><FiMapPin /> {profile.location}</p>
          </div>
          <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
            <input {...register('name', { required: true })} placeholder="Name" />
            <input {...register('email', { required: true })} type="email" placeholder="Email" />
            <input {...register('subject')} placeholder="Subject" />
            <textarea {...register('message', { required: true })} placeholder="Message" rows="5" />
            <Button icon={FiSend} disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send Message'}</Button>
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
      <Modal open={projectModalOpen} title="Add Project" onClose={() => setProjectModalOpen(false)}>
        <form className="admin-form project-upload-form" onSubmit={handleProjectSubmit(createProject)}>
          <input {...registerProject('title', { required: true })} placeholder="Project title" />
          <textarea {...registerProject('description', { required: true })} placeholder="Project description" rows="4" />
          <input {...registerProject('technologies', { required: true })} placeholder="Technologies, comma separated" />
          <input {...registerProject('category')} placeholder="Category (for example MERN)" />
          <input {...registerProject('githubUrl')} type="url" placeholder="GitHub URL" />
          <input {...registerProject('liveUrl')} type="url" placeholder="Live demo URL" />
          <label className="project-image-field">
            <span>Project image</span>
            <input {...registerProject('image')} type="file" accept="image/*" />
          </label>
          <label className="check-row"><input {...registerProject('featured')} type="checkbox" /> Featured project</label>
          <Button type="submit" icon={FiUpload} disabled={isSavingProject}>
            {isSavingProject ? 'Uploading...' : 'Upload Project'}
          </Button>
        </form>
      </Modal>
      <Modal open={Boolean(projectToDelete)} title="Delete Project" onClose={() => setProjectToDelete(null)}>
        <div className="delete-project-confirmation">
          <p>Are you sure you want to delete <strong>{projectToDelete?.title}</strong>?</p>
          <div className="delete-project-actions">
            <Button variant="secondary" onClick={() => setProjectToDelete(null)}>Cancel</Button>
            <Button className="danger-button" icon={FiTrash2} onClick={deleteProject}>Delete Project</Button>
          </div>
        </div>
      </Modal>
      <Modal open={certificateModalOpen} title="Add Certificate" onClose={() => setCertificateModalOpen(false)}>
        <form className="admin-form project-upload-form" onSubmit={handleCertificateSubmit(createCertificate)}>
          <input {...registerCertificate('name', { required: true })} placeholder="Certificate name" />
          <input {...registerCertificate('organization', { required: true })} placeholder="Organization" />
          <label className="project-image-field">
            <span>Issue date</span>
            <input {...registerCertificate('issueDate', { required: true })} type="date" />
          </label>
          <input {...registerCertificate('credentialUrl')} type="url" placeholder="Credential URL" />
          <label className="project-image-field">
            <span>Certificate picture or PDF</span>
            <input {...registerCertificate('asset', { required: true })} type="file" accept="image/*,application/pdf" />
          </label>
          <Button type="submit" icon={FiUpload} disabled={isSavingCertificate}>
            {isSavingCertificate ? 'Adding...' : 'Add Certificate'}
          </Button>
        </form>
      </Modal>
      <Modal open={Boolean(certificateToDelete)} title="Delete Certificate" onClose={() => setCertificateToDelete(null)}>
        <div className="delete-project-confirmation">
          <p>Are you sure you want to delete <strong>{certificateToDelete?.name}</strong>?</p>
          <div className="delete-project-actions">
            <Button variant="secondary" onClick={() => setCertificateToDelete(null)}>Cancel</Button>
            <Button className="danger-button" icon={FiTrash2} onClick={deleteCertificate}>Delete Certificate</Button>
          </div>
        </div>
      </Modal>
    </main>
  );
};

export default Home;
