import { Router } from 'express';
import { sendWhatsApp } from '../controllers/whatsappController.js';

const router = Router();

router.post('/send', sendWhatsApp);

export default router;
