import express from 'express';
import Experience from '../models/Experience.js';
import { createOne, deleteOne, getAll, getOne, updateOne } from '../controllers/crudFactory.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAll(Experience));
router.get('/:id', getOne(Experience));
router.post('/', protect, createOne(Experience, 'experience'));
router.put('/:id', protect, updateOne(Experience, 'experience'));
router.delete('/:id', protect, deleteOne(Experience, 'experience'));

export default router;
