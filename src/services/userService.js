import UserModel from "../models/userModel.js";

export const registerUserService = async ({
    firstname,
    lastname,
    email,
    password
}) => {
    try {
        if(!firstname, !email, !password) {
            throw new Error("All fields are required")
        }

        const user = UserModel.create({
            fullname: {
                firstname,
                lastname
            },
            email,
            password
        });

        return user;
    } catch (error) {
        console.log("Error in registerUserService", error);
        throw error;
    }
}