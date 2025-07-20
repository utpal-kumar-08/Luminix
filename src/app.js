import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({
    limit:"18kb"
}));
app.use(express.urlencoded({extended:true,
    limit:"18kb"}))
    app.use(express.static('public'));
    app.use(cookieParser());
import userRouter from './routes/user.routes.js';
app.use('/users',userRouter)
app.get('/', (req, res) => res.send('Server is up!'));
export {app}