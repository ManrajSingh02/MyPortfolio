export const fallbackProfile = {
  name: 'Manraj Singh',
  role: 'MCA Student',
  bio: 'MCA student and MERN stack developer who enjoys turning practical ideas into polished, scalable web experiences.',
  careerObjective:
    'To grow as a software developer by building reliable products, learning deeply, and contributing clean full-stack solutions with React, Node.js and MongoDB.',
  email: 'singhmani5995@gmail.com',
  phone: '7508948550',
  location: 'Punjab, India',
  photo: { url: '/professional-profile.png' },
  typingRoles: ['MCA Student', 'MERN Developer', 'Frontend Engineer', 'Problem Solver'],
  socials: {
    linkedin: '#',
    github: '#',
    instagram: '#',
    leetcode: '#',
    codechef: '#'
  }
};

export const fallbackProjects = [
  {
    _id: 'p1',
    title: 'Developer Portfolio',
    description: 'A fast, responsive developer portfolio featuring professional experience, skills, projects, certificates and direct contact.',
    technologies: ['React', 'JavaScript', 'CSS', 'Vite'],
    category: 'Frontend',
    githubUrl: '#',
    liveUrl: '#',
    featured: true
  },
  {
    _id: 'p2',
    title: 'Student Performance Dashboard',
    description: 'Analytics dashboard for academic records, attendance snapshots and performance insights using reusable chart-ready data.',
    technologies: ['React', 'JavaScript', 'REST API'],
    category: 'Dashboard',
    githubUrl: '#',
    liveUrl: '#',
    featured: false
  }
];

export const fallbackSkills = [
  { _id: 's1', name: 'JavaScript', level: 90, category: 'technical' },
  { _id: 's2', name: 'React.js', level: 88, category: 'technical' },
  { _id: 's3', name: 'Node.js', level: 82, category: 'technical' },
  { _id: 's4', name: 'MongoDB', level: 78, category: 'technical' },
  { _id: 's5', name: 'Communication', level: 86, category: 'soft' },
  { _id: 's6', name: 'Teamwork', level: 84, category: 'soft' }
];

export const fallbackEducation = [
  {
    _id: 'e1',
    degree: 'Master of Computer Applications',
    institution: 'GNA University',
    location: 'India',
    startYear: '2024',
    endYear: '2026',
    score: 'Pursuing',
    description: 'Focused on software engineering, data structures, database systems and modern web application development.'
  }
];

export const fallbackExperience = [
  {
    _id: 'x1',
    role: 'Full Stack Developer Intern',
    company: 'Pennep',
    location: 'Remote',
    startDate: '2026-01-01',
    current: true,
    type: 'Internship',
    description: 'Built responsive frontend modules, REST endpoints and database-backed features for real-world web applications.',
    highlights: ['Created reusable React components', 'Integrated protected API workflows', 'Improved UI polish and responsiveness']
  }
];

export const fallbackCertificates = [
  {
    _id: 'c1',
    name: 'MERN Stack Development',
    organization: 'Online Certification',
    issueDate: '2025-06-15',
    credentialUrl: '#'
  }
];

export const fallbackResume = {
  title: 'Manraj Singh Resume',
  url: '/resume/Manraj_Singh_Resume.pdf',
  downloads: 0
};
