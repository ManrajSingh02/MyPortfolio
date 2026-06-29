import {
  fallbackCertificates,
  fallbackEducation,
  fallbackExperience,
  fallbackProfile,
  fallbackProjects,
  fallbackResume,
  fallbackSkills
} from '../data/fallbackData.js';

const portfolio = {
  profile: fallbackProfile,
  projects: fallbackProjects,
  certificates: fallbackCertificates,
  skills: fallbackSkills,
  education: fallbackEducation,
  experience: fallbackExperience,
  resume: fallbackResume
};

export const usePortfolio = () => ({ data: portfolio, loading: false, error: '' });
