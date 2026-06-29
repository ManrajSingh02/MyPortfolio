import api, { unwrapList } from './api.js';
import {
  fallbackCertificates,
  fallbackEducation,
  fallbackExperience,
  fallbackProfile,
  fallbackProjects,
  fallbackResume,
  fallbackSkills
} from '../data/fallbackData.js';

const safe = async (request, fallback) => {
  try {
    return await request();
  } catch {
    return fallback;
  }
};

const normalizeExperience = (items) => items.map((item) => (
  item.role === 'Full Stack Developer Intern'
    ? { ...item, company: 'Pennep', startDate: '2026-01-01' }
    : item
));

const normalizeEducation = (items) => items.map((item) => (
  item.degree === 'Master of Computer Applications'
    ? { ...item, institution: 'GNA University' }
    : item
));

export const getPortfolio = async () => {
  const [profile, projects, certificates, skills, education, experience, resume] = await Promise.all([
    safe(() => api.get('/profile').then((res) => res.data || fallbackProfile), fallbackProfile),
    safe(() => api.get('/projects').then((res) => unwrapList(res, fallbackProjects)), fallbackProjects),
    safe(() => api.get('/certificates').then((res) => unwrapList(res, fallbackCertificates)), fallbackCertificates),
    safe(() => api.get('/skills').then((res) => unwrapList(res, fallbackSkills)), fallbackSkills),
    safe(() => api.get('/education').then((res) => unwrapList(res, fallbackEducation)), fallbackEducation),
    safe(() => api.get('/experience').then((res) => unwrapList(res, fallbackExperience)), fallbackExperience),
    safe(() => api.get('/resume').then((res) => res.data || fallbackResume), fallbackResume)
  ]);

  return {
    profile,
    projects,
    certificates,
    skills,
    education: normalizeEducation(education),
    experience: normalizeExperience(experience),
    resume
  };
};

export const sendMessage = (payload) => api.post('/messages', payload);
export const trackResumeDownload = () => api.post('/resume/download');
