import express from 'express'; 
import authMiddleware from '../middleware/AuthMiddleware.js';
import {Editor} from '../controller/EditorController.js';

const router = express.Router();

router.post('/Home', authMiddleware, getCode); 

export default router;
