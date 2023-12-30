import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import skillRoutes from './routes/skillRoutes.js';



const app = express();
dotenv.config();


const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;


app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/user', userRoutes);
app.use('/api/job', jobRoutes);
app.use('/api/skill', skillRoutes);



app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'active'
    });
});


app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});


app.listen(PORT, async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`server is running at PORT: ${PORT} and database connected successfully`);
    }
    catch (err) {
        console.log(`database is not connected and the error is : ${err.message}`);
    }
})