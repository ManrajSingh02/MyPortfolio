import express from 'express';
import { deleteResume, getResume, trackResumeDownload, uploadResume } from '../controllers/resumeController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getResume);
router.post('/download', trackResumeDownload);
router.post('/', protect, upload.single('resume'), uploadResume);
router.put('/', protect, upload.single('resume'), uploadResume);
router.delete('/', protect, deleteResume);

export default router;
