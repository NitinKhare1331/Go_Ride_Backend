import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/serverConfig.js";

export const authMiddleware = async (req, res, next) => {

    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await UserModel.findById(decoded._id);
        req.user = user;

        return next();

    } catch (error) {
        console.log("authMiddleware error", error);
        return res.status(500).json(error);
    }
}