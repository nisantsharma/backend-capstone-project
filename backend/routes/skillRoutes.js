import express from 'express';
import { getSkill } from '../controllers/skillController.js';


const router = express.Router();


router.get('/getSkill', getSkill);



export default router;
