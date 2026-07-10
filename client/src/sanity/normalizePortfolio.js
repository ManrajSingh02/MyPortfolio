const assetUrl = (asset) => asset?.url || asset || '';
const objectOrEmpty = (value) => value || {};
const arrayOrEmpty = (value) => (Array.isArray(value) ? value : []);

const normalizeProfile = (profile, social, resume) => {
  const safeProfile = objectOrEmpty(profile);
  const safeSocial = objectOrEmpty(social);
  const safeResume = objectOrEmpty(resume);

  return {
    name: safeProfile.name || 'Portfolio',
    role: safeProfile.profession || safeProfile.role || '',
    bio: safeProfile.about || safeProfile.bio || '',
    careerObjective: safeProfile.about || safeProfile.careerObjective || '',
    email: safeProfile.email || safeSocial.email || '',
    phone: safeProfile.phone || '',
    location: safeProfile.location || '',
    photo: { url: assetUrl(safeProfile.photo) },
    typingRoles: safeProfile.profession ? [safeProfile.profession] : safeProfile.typingRoles || [],
    socials: {
      linkedin: safeSocial.linkedIn || safeProfile.socials?.linkedin || '#',
      github: safeSocial.github || safeProfile.socials?.github || '#',
      leetcode: safeSocial.leetCode || safeProfile.socials?.leetcode || '#',
      hackerRank: safeSocial.hackerRank || safeProfile.socials?.hackerRank || '#',
      portfolio: safeSocial.portfolio || '#',
    },
    resumeUrl: assetUrl(safeProfile.resumePdf) || assetUrl(safeResume.resumePdf),
  };
};

const normalizeProjects = (projects = []) =>
  arrayOrEmpty(projects).map((project) => ({
    _id: project._id,
    title: project.title,
    slug: project.slug,
    description: project.description,
    image: { url: assetUrl(project.image) },
    technologies: project.technologies || [],
    category: project.category || project.technologies?.[0] || 'Project',
    githubUrl: project.github || '#',
    liveUrl: project.liveDemo || project.liveUrl || '#',
    featured: Boolean(project.featured),
  }));

const normalizeSkills = (skills = []) =>
  arrayOrEmpty(skills).map((skill) => ({
    _id: skill._id,
    name: skill.skillName || skill.name,
    level: skill.percentage ?? skill.level ?? 0,
    category: skill.category,
    icon: skill.icon,
    color: skill.color,
  }));

const normalizeCertificates = (certificates = []) =>
  arrayOrEmpty(certificates).map((certificate) => ({
    _id: certificate._id,
    name: certificate.title || certificate.name,
    organization: certificate.organization,
    issueDate: certificate.issueDate,
    image: { url: assetUrl(certificate.certificateImage || certificate.image) },
    pdf: { url: assetUrl(certificate.certificatePdf || certificate.pdf) },
    credentialUrl: certificate.credentialLink || certificate.credentialUrl || '#',
  }));

const normalizeEducation = (education = []) =>
  arrayOrEmpty(education).map((item) => ({
    _id: item._id,
    degree: item.degree,
    institution: item.college || item.institution || item.university,
    location: item.university || item.location || '',
    startYear: item.startYear,
    endYear: item.endYear,
    score: item.cgpa || item.score || '',
    description: item.university ? `University: ${item.university}` : item.description || '',
  }));

const normalizeExperience = (experience = []) =>
  arrayOrEmpty(experience).map((item) => ({
    _id: item._id,
    role: item.role,
    company: item.company,
    description: item.description,
    technologies: item.technologies || [],
    duration: item.duration,
    startDate: item.startDate,
    endDate: item.endDate,
    current: item.current,
    type: item.type || '',
  }));

export const normalizePortfolio = (portfolio) => {
  const safePortfolio = objectOrEmpty(portfolio);
  const safeResume = objectOrEmpty(safePortfolio.resume);
  const profile = normalizeProfile(safePortfolio.profile, safePortfolio.social, safeResume);
  const resumeUrl = assetUrl(safeResume.resumePdf) || profile.resumeUrl || safeResume.url;

  return {
    profile,
    projects: normalizeProjects(safePortfolio.projects),
    certificates: normalizeCertificates(safePortfolio.certificates),
    skills: normalizeSkills(safePortfolio.skills),
    education: normalizeEducation(safePortfolio.education),
    experience: normalizeExperience(safePortfolio.experience),
    resume: {
      title: safeResume.title || `${profile.name} Resume`,
      url: resumeUrl,
      downloads: safeResume.downloads || 0,
    },
  };
};
