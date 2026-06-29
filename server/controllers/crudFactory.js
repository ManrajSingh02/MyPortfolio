import asyncHandler from '../utils/asyncHandler.js';
import { deleteFromCloudinary, uploadToCloudinary } from '../services/uploadService.js';

const parseBody = (body) => {
  const parsed = { ...body };
  ['technologies', 'highlights', 'typingRoles'].forEach((key) => {
    if (typeof parsed[key] === 'string') {
      parsed[key] = parsed[key].split(',').map((item) => item.trim()).filter(Boolean);
    }
  });
  return parsed;
};

export const getAll = (Model, options = {}) =>
  asyncHandler(async (req, res) => {
    const query = {};
    const page = Math.max(Number(req.query.page || 1), 1);
    const limit = Math.min(Math.max(Number(req.query.limit || options.limit || 50), 1), 100);
    const skip = (page - 1) * limit;

    if (req.query.search && options.search) {
      query.$text = { $search: req.query.search };
    }
    if (req.query.category) query.category = req.query.category;
    if (req.query.technology) query.technologies = req.query.technology;

    const [items, total] = await Promise.all([
      Model.find(query).sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit),
      Model.countDocuments(query)
    ]);

    res.json({ items, total, page, pages: Math.ceil(total / limit) || 1 });
  });

export const getOne = (Model) =>
  asyncHandler(async (req, res) => {
    const item = await Model.findById(req.params.id);
    if (!item) {
      res.status(404);
      throw new Error('Record not found');
    }
    res.json(item);
  });

export const createOne = (Model, _entity, uploadFields = {}) =>
  asyncHandler(async (req, res) => {
    const data = parseBody(req.body);
    for (const [field, folder] of Object.entries(uploadFields)) {
      const file = req.files?.[field]?.[0] || (req.file && field === 'image' ? req.file : null);
      if (file) data[field] = await uploadToCloudinary(file, folder);
    }
    const item = await Model.create(data);
    res.status(201).json(item);
  });

export const updateOne = (Model, _entity, uploadFields = {}) =>
  asyncHandler(async (req, res) => {
    const item = await Model.findById(req.params.id);
    if (!item) {
      res.status(404);
      throw new Error('Record not found');
    }

    const data = parseBody(req.body);
    for (const [field, folder] of Object.entries(uploadFields)) {
      const file = req.files?.[field]?.[0] || (req.file && field === 'image' ? req.file : null);
      if (file) {
        await deleteFromCloudinary(item[field]?.publicId, item[field]?.resourceType || 'image');
        data[field] = await uploadToCloudinary(file, folder);
      }
    }

    Object.assign(item, data);
    await item.save();
    res.json(item);
  });

export const deleteOne = (Model, _entity, uploadFields = []) =>
  asyncHandler(async (req, res) => {
    const item = await Model.findById(req.params.id);
    if (!item) {
      res.status(404);
      throw new Error('Record not found');
    }

    for (const field of uploadFields) {
      await deleteFromCloudinary(item[field]?.publicId, item[field]?.resourceType || 'image');
    }

    await item.deleteOne();
    res.json({ message: 'Deleted successfully' });
  });
