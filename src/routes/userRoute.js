import express from 'express';
import { body } from 'express-validator';
import { registerUserController } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage("Firstname must be 3 characters long"),
    body('password').isLength({ min: 6 }).withMessage("Password must be 6 characters long")
], registerUserController)

export default router;