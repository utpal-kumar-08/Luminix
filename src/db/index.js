import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {DB_NAME} from "../constants.js";
const connectDB=async()=>{
    try{
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MONGO connected to ${connectionInstance.connection.host} on port ${connectionInstance.connection.port}`);
        return connectionInstance;

    }
    catch(error){
        console.error(" MONGO not connected", error);
        process.exit(1);

    }
}
export default connectDB;