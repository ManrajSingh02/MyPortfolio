import express from 'express';
import { getProfile, upsertProfile } from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getProfile);
router.post('/', protect, upload.single('photo'), upsertProfile);
router.put('/', protect, upload.single('photo'), upsertProfile);

export default router;
