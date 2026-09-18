import { Router } from 'express';
import { createDesignBrief, getDesignBrief } from '../controllers/briefController.js';

const router = Router();

router.post('/', createDesignBrief);
router.get('/:id', getDesignBrief);

export default router;
