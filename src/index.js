import express from 'express';
import mongoose from'mongoose';
import dotenv from 'dotenv';
import authRouter from './router/auth.js';
import userRouter from './router/user.js';

const app = express();

dotenv.config();

app.use(express.json());
// app.use(cors());

const { PORT, MONGO_URL } = process.env;

app.use('/api', authRouter);
app.use('/api', userRouter);

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
    mongoose.connect(MONGO_URL).then(()=>{
    console.log('Connected to MongoDB');
    }).catch(err => {
        console.log('Could not connect to MongoDB');
        console.log(err);
    });
});