import "dotenv/config"
import mongoose from "mongoose"

const connectToDb= async()=>{
    try {
        await mongoose.connect(process.env.AUTH_MONGO_URI);
        console.log("MongoDB connected!")
    } catch (error) {
        console.error("MongoDB connection error: ", error);
        process.exit(1);
    }
}

export default connectToDb;