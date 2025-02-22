import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.get('/ping', (req, res) => {
    res.status(200).json({ message: "PO PO PO PONG" });
});

(
    async () => {
        try {
            const PORT = process.env.PORT;
            const MONGO_URI = process.env.MONGO_URI;

            await mongoose.connect(MONGO_URI);
            console.log("Mongodb connected");

            app.listen(PORT, () => console.log('ruNNing on port ', PORT));
        } catch (error) {
            console.log("server Error", error);
            process.exit(1)
        }
    }
)()