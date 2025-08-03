import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './lib/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import appointmentRRoutes from './routes/appointment.route.js';

const app = express();
app.use(express.json());
dotenv.config()
app.use(cors());
app.use(cookieParser())



app.use("/api/auth",authRoutes)
app.use("/api/appointment",appointmentRRoutes)
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});