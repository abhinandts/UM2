import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import AuthRouter from './routes/authRoutes.js'
import ProtectedRouter from './routes/protectedRoutes.js'

dotenv.config();

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/auth', AuthRouter);
app.use('/protected', ProtectedRouter);

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected")
    } catch (error) {
        console.error("MongoDB connection error", error)
    }
}

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => console.log(`server running on port`, PORT))
    } catch (error) {
        console.error("Server startup error", error);
        process.exit(1);
    }
}

startServer();