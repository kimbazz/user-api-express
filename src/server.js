import express from 'express';
import dotenv from 'dotenv';
// import mongoose from 'mongoose';
import userRoutes from './interfaces/http/routes/userRoutes.js';
import errorHandler from './interfaces/middleware/errorHandler.js';

dotenv.config();
// mongoose.connect(process.env.MONGO_URI);

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);
app.use(errorHandler);

app.listen(process.env.PORT || 3000, () =>
    console.log(`API up on port ${process.env.PORT || 3000}`)
);