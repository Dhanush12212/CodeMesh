import express from 'express';
import {Login, Register, Logout } from '../controller/AuthController.js'
import AuthMiddleWare from '../middleware/AuthMiddleware.js'

const router = express.Router()

router.post('/login', Login);
router.post('/register', Register);
router.put('/logout', Logout); 
router.get('/loginStatus', AuthMiddleWare, (req, res) => {
    return res.json({ isAuthenticated: true, user: req.user });
});



export default router;