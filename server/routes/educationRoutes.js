import express from 'express';
import Education from '../models/Education.js';
import { createOne, deleteOne, getAll, getOne, updateOne } from '../controllers/crudFactory.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAll(Education));
router.get('/:id', getOne(Education));
router.post('/', protect, createOne(Education, 'education'));
router.put('/:id', protect, updateOne(Education, 'education'));
router.delete('/:id', protect, deleteOne(Education, 'education'));

export default router;
