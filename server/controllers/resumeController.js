import Resume from '../models/Resume.js';
import asyncHandler from '../utils/asyncHandler.js';
import { deleteFromCloudinary, uploadToCloudinary } from '../services/uploadService.js';

export const getResume = asyncHandler(async (_req, res) => {
  const resume = await Resume.findOne().sort({ createdAt: -1 });
  res.json(resume);
});

export const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('Resume PDF is required');
  }

  const previous = await Resume.findOne().sort({ createdAt: -1 });
  if (previous?.publicId) await deleteFromCloudinary(previous.publicId, previous.resourceType);

  const file = await uploadToCloudinary(req.file, 'portfolio/resume');
  const resume = await Resume.create({
    title: req.body.title || 'Latest Resume',
    url: file.url,
    publicId: file.publicId,
    resourceType: file.resourceType,
    uploadedBy: req.admin?._id
  });
  res.status(201).json(resume);
});

export const trackResumeDownload = asyncHandler(async (_req, res) => {
  const resume = await Resume.findOne().sort({ createdAt: -1 });
  if (!resume) {
    res.status(404);
    throw new Error('Resume not uploaded yet');
  }
  resume.downloads += 1;
  await resume.save();
  res.json({ url: resume.url, downloads: resume.downloads });
});

export const deleteResume = asyncHandler(async (_req, res) => {
  const resume = await Resume.findOne().sort({ createdAt: -1 });
  if (!resume) {
    res.status(404);
    throw new Error('Resume not found');
  }
  await deleteFromCloudinary(resume.publicId, resume.resourceType);
  await resume.deleteOne();
  res.json({ message: 'Resume deleted successfully' });
});
