import WheelmanModel from "../models/wheelmanModel.js";

export const registerWheelmanService = async ({
    wheelmanName,
    email,
    password,
    color,
    plate,
    capacity,
    vehicleType
}) => {
    try {
        if(!wheelmanName, !email, !password, !color, !plate, !capacity, !vehicleType) {
            throw new Error("All fields are required")
        }

        const wheelman = WheelmanModel.create({
            wheelmanName,
            email,
            password,
            vehicle: {
                color,
                plate,
                capacity,
                vehicleType
            }
        });

        return wheelman;
    } catch (error) {
        console.log("Error in registerWheelmanService", error);
        throw error
        
    }
}