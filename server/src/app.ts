import connectDB from './db';
import dotenv from 'dotenv';
import DataModel from './dataModal';
import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import dataRoutes from './dataModalRouter';
dotenv.config();

const app = express();
const cors = require("cors");
// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.use(dataRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));