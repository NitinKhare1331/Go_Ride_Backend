import UserModel from "../models/userModel.js"
import { registerUserService } from "../services/userService.js"
import { validationResult } from "express-validator"

export const registerUserController = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }

        const { fullname, email, password } = req.body;

        const hashedPassword = await UserModel.hashPassword(password);

        const newUser = await registerUserService({
            firstname: fullname.firstname, 
            lastname: fullname.lastname,
            email,
            password: hashedPassword
        });

        const token = newUser.generateAuthToken();

        res.status(201).json({ token, newUser });

    } catch (error) {
        console.log("registerUserController error", error);
        return res.status(500).json(error);
        
    }
}

export const loginUserController = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }

        const { email, password } = req.body;

        const user = await UserModel.findOne({ email }).select('+password');

        if(!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await user.comparePassword(password);

        if(!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const token = user.generateAuthToken();

        res.cookie('token', token);

        return res.status(200).json({ token, user });
    } catch (error) {
        console.log("loginUserController error", error);
        return res.status(500).json(error);
    }
}

export const getUserProfileController = async (req, res, next) => {
    try {
        const user = req.user;
        return res.status(200).json(user);
    } catch (error) {
        console.log("getUserProfileController error", error);
        return res.status(500).json(error);
    }
}