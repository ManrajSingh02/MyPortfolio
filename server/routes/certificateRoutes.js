import express from 'express';
import Certificate from '../models/Certificate.js';
import { createOne, deleteOne, getAll, getOne, updateOne } from '../controllers/crudFactory.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getAll(Certificate));
router.get('/:id', getOne(Certificate));
router.post('/', protect, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), createOne(Certificate, 'certificate', { image: 'portfolio/certificates', pdf: 'portfolio/certificates' }));
router.put('/:id', protect, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), updateOne(Certificate, 'certificate', { image: 'portfolio/certificates', pdf: 'portfolio/certificates' }));
router.delete('/:id', protect, deleteOne(Certificate, 'certificate', ['image', 'pdf']));

export default router;
