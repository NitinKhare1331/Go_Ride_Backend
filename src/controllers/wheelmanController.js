import { validationResult } from "express-validator";
import WheelmanModel from "../models/wheelmanModel.js"; 
import { registerWheelmanService } from "../services/wheelmanService.js";
import BlacklistTokenModel from "../models/blacklistTokenModel.js";

export const registerWheelmanController = async (req, res, next) => {
    try {
        const error = validationResult(req);

        if(!error.isEmpty()) {
            return res.status(400).json({errors: error.array() });
        }

        const { wheelmanName, email, password, vehicle } = req.body;

        const isWheelmanAlreadyExist = await WheelmanModel.findOne({ email });

        if(isWheelmanAlreadyExist) {
            return res.status(400).json({ message: "User already exists" });
        };

        const hashedPassword = await WheelmanModel.hashPassword(password);

        const newWheelman = await registerWheelmanService({
            wheelmanName,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });

        const token = newWheelman.generateAuthToken();

        return res.status(201).json({ token, newWheelman })
    } catch (error) {
        console.log("registerWheelmanController error", error);
        return res.status(500).json(error);
    }
}

export const loginWheelmanController = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }

        const { email, password } = req.body;

        const wheelman = await WheelmanModel.findOne({ email }).select('+password');

        if(!wheelman) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await wheelman.comparePassword(password);

        if(!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const token = wheelman.generateAuthToken();

        res.cookie('token', token);

        return res.status(200).json({ token, wheelman });
    } catch (error) {
        console.log("loginWheelmanController error", error);
        return res.status(500).json(error);
    }
}

export const getWheelmanProfileController = async (req, res, next) => {
    return res.status(200).json({ wheelman: req.wheelman });
}

export const logoutWheelmanController = async (req, res, next) => {
    try {
        res.clearCookie('token');

        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        await BlacklistTokenModel.create({ token });

        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.log("logoutWheelmanController error", error);
        return res.status(500).json(error);
        
    }
}