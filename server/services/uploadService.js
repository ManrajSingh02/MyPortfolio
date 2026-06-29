import fs from 'fs';
import cloudinary from '../config/cloudinary.js';

export const uploadToCloudinary = async (file, folder = 'portfolio') => {
  if (!file) return null;

  const result = await cloudinary.uploader.upload(file.path, {
    folder,
    resource_type: file.mimetype === 'application/pdf' ? 'raw' : 'image'
  });

  fs.promises.unlink(file.path).catch(() => {});
  return {
    url: result.secure_url,
    publicId: result.public_id,
    resourceType: result.resource_type
  };
};

export const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
};
