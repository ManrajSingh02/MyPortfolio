import { Router } from 'express';
import { sendContactMessage } from '../controllers/contactController.js';
import { contactRateLimit } from '../middleware/contactRateLimit.js';

const router = Router();

router.post('/', contactRateLimit, sendContactMessage);

export default router;
