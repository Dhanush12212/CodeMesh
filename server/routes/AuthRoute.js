import express from 'express';
import {Login, Register, Logout } from '../controller/AuthController.js'


const router = express.Router()

router.post('/login', Login);
router.post('/register', Register);
router.put('/logout', Logout);


export default router;