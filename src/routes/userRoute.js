import express from 'express';
import { body } from 'express-validator';
import { registerUserController, loginUserController, getUserProfileController, logoutUserController } from '../controllers/userController.js';
import { authUserMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage("Firstname must be 3 characters long"),
    body('password').isLength({ min: 6 }).withMessage("Password must be 6 characters long")
], registerUserController);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage("Password must be 6 characters long")
], loginUserController);

router.get('/profile', authUserMiddleware, getUserProfileController);

router.get('/logout', authUserMiddleware, logoutUserController);

export default router;