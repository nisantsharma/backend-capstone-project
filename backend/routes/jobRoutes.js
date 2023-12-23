import express from 'express';

import { createJobPost, getJobPost, updateJobPost } from '../controllers/jobController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';


const router = express.Router();


router.post('/create', authenticateToken, createJobPost);
router.put('/update/:id', authenticateToken, updateJobPost);
router.get('/getJobPost/:id', authenticateToken, getJobPost);




export default router;