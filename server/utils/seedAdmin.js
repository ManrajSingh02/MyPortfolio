import dotenv from 'dotenv';
import Admin from '../models/Admin.js';
import Profile from '../models/Profile.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Education from '../models/Education.js';
import Experience from '../models/Experience.js';
import connectDB from '../config/db.js';

dotenv.config();

const run = async () => {
  await connectDB();
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'ChangeMe123!';

  const existingAdmin = await Admin.findOne({ email });
  if (!existingAdmin) {
    await Admin.create({ name: 'Portfolio Admin', email, password });
  }
  await Profile.findOneAndUpdate(
    {},
    {
      name: 'Manraj Singh',
      role: 'MCA Student',
      bio: 'MCA student and full-stack developer focused on building clean, performant and user-friendly web applications.',
      careerObjective: 'To contribute as a software developer by applying MERN stack skills, strong fundamentals and continuous learning to solve meaningful real-world problems.',
      email: 'singhmani5995@gmail.com',
      phone: '7508948550',
      location: 'Punjab, India',
      typingRoles: ['MCA Student', 'MERN Developer', 'Problem Solver'],
      socials: { linkedin: '#', github: '#', instagram: '#', leetcode: '#', codechef: '#' }
    },
    { upsert: true, new: true }
  );

  if ((await Skill.countDocuments()) === 0) {
    await Skill.insertMany([
      { name: 'React.js', level: 88, category: 'technical' },
      { name: 'Node.js', level: 82, category: 'technical' },
      { name: 'MongoDB', level: 78, category: 'technical' },
      { name: 'JavaScript', level: 90, category: 'technical' },
      { name: 'Communication', level: 86, category: 'soft' },
      { name: 'Teamwork', level: 84, category: 'soft' }
    ]);
  }
  if ((await Project.countDocuments()) === 0) {
    await Project.create({
      title: 'Portfolio CMS',
      description: 'A full-stack MERN portfolio with secure admin CMS, Cloudinary uploads and responsive animated UI.',
      technologies: ['React', 'Node', 'Express', 'MongoDB', 'Cloudinary'],
      category: 'MERN',
      featured: true
    });
  }
  if ((await Education.countDocuments()) === 0) {
    await Education.create({ degree: 'Master of Computer Applications', institution: 'GNA University', startYear: '2024', endYear: '2026', score: 'Pursuing', description: 'Advanced computer applications, web technologies and software engineering.' });
  }
  if ((await Experience.countDocuments()) === 0) {
    await Experience.create({ role: 'Full Stack Developer Intern', company: 'Pennep', startDate: new Date('2026-01-01'), type: 'Internship', description: 'Built responsive UI components, REST APIs and database-backed features.', highlights: ['Developed MERN features', 'Collaborated with agile team'] });
  }
  console.log(`Seed complete. Admin: ${email} / ${password}`);
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
