import mongoose from "mongoose";
import EnvData from "../config/data/env-data";

export const connectDB = async () => {
    try {
        await mongoose.connect(EnvData.DB_URL);
        console.log('Successfully connected to database');
    }catch(error) {
        console.log('Unable to connect to database.');
        process.exit();
    }
}