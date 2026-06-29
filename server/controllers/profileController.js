import Profile from '../models/Profile.js';
import asyncHandler from '../utils/asyncHandler.js';
import { deleteFromCloudinary, uploadToCloudinary } from '../services/uploadService.js';

export const getProfile = asyncHandler(async (_req, res) => {
  const profile = await Profile.findOne().sort({ updatedAt: -1 });
  res.json(profile);
});

export const upsertProfile = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (typeof data.typingRoles === 'string') {
    data.typingRoles = data.typingRoles.split(',').map((item) => item.trim()).filter(Boolean);
  }
  if (typeof data.socials === 'string') data.socials = JSON.parse(data.socials);

  let profile = await Profile.findOne();
  if (req.file) {
    if (profile?.photo?.publicId) await deleteFromCloudinary(profile.photo.publicId);
    data.photo = await uploadToCloudinary(req.file, 'portfolio/profile');
  }

  profile = profile ? Object.assign(profile, data) : new Profile(data);
  await profile.save();
  res.json(profile);
});
