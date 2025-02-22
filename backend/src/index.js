import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import AuthRouter from './routes/authRoutes.js'

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', AuthRouter);

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