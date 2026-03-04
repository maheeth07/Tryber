import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import gymRoutes from "./routes/gymRoutes.js"
import planRoutes from "./routes/planRoutes.js"
import membershipRoutes from './routes/membershipRoutes.js'
import authRoutes from './routes/authRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import chatRoutes from './routes/chatRoutes.js';

dotenv.config();
const app=express();

app.use(cors());
app.use(express.json());
connectDB();
app.use("/api/gyms",gymRoutes);
app.use("/api/plans",planRoutes);
app.use("/api/memberships",membershipRoutes);
app.use("/api/auth",authRoutes);
app.use('/api/dashboard',dashboardRoutes);
app.use("/api/chat",chatRoutes);

app.get('/',(req,res)=>{
    console.log('Backend running..');
})

const PORT=process.env.PORT||5000;

app.listen(PORT,()=>{
    console.log(`Server running on PORT:${PORT}`);
})