import connectDB from './db';
import dotenv from 'dotenv';
import DataModel from './dataModal';
import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import dataRoutes from './dataModalRouter';
import userRoutes from './userModalRouter';

dotenv.config();

const app = express();
const cors = require('cors');

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.use(dataRoutes);
app.use(userRoutes);

export default app;
