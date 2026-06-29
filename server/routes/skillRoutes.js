import express from 'express';
import Skill from '../models/Skill.js';
import { createOne, deleteOne, getAll, getOne, updateOne } from '../controllers/crudFactory.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAll(Skill));
router.get('/:id', getOne(Skill));
router.post('/', protect, createOne(Skill, 'skill'));
router.put('/:id', protect, updateOne(Skill, 'skill'));
router.delete('/:id', protect, deleteOne(Skill, 'skill'));

export default router;
