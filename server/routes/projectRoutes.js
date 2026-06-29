import express from 'express';
import Project from '../models/Project.js';
import { createOne, deleteOne, getAll, getOne, updateOne } from '../controllers/crudFactory.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getAll(Project, { search: true }));
router.get('/:id', getOne(Project));
router.post('/', protect, upload.fields([{ name: 'image', maxCount: 1 }]), createOne(Project, 'project', { image: 'portfolio/projects' }));
router.put('/:id', protect, upload.fields([{ name: 'image', maxCount: 1 }]), updateOne(Project, 'project', { image: 'portfolio/projects' }));
router.delete('/:id', protect, deleteOne(Project, 'project', ['image']));

export default router;
