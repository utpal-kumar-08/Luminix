//require('dotenv').config({path: './.env'});
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import connectDB from './db/index.js';
import express from 'express';
import { app } from './app.js'; // <-- This is missing!




console.log('Trying to connect to MongoDB...');
// app.get('/', (req, res) => {
//     res.send('Hello from original server!');
//   });
  
connectDB()
  .then(() => {
    console.log('MongoDB connected successfully.');
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });
































/*import express from 'express';
const app=express();

(async() => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERROR CONNECTING TO MONGODB",error);
            throw error;
        })
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });

    }
    catch(error){
        console.error("Error connecting to MongoDB:", error);
        throw
    }

})()*/