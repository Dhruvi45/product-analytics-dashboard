import connectDB from './db';
import dotenv from 'dotenv';
import DataModel from './dataModal';
import mongoose from 'mongoose';
import express, { Request, Response } from 'express';

dotenv.config();

const app = express();
const cors = require("cors");
// Connect to database
connectDB();

// Middleware
app.use(cors({}));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, Express!");
});

app.get('/data', async (req: Request, res: Response) => {
    try {
      const { age, gender, startDate, endDate } = req.query;
  
      // Build the query object
      const query: any = {};
  
      if (age) {
        query.Age = age;
      }
  
      if (gender) {
        query.Gender = gender;
      }
  
      if (startDate || endDate) {
        const dateRangeQuery: any = {};
        if (startDate && typeof startDate === 'string') {
            dateRangeQuery.$gte = new Date(startDate);
          }
          
          if (endDate && typeof endDate === 'string') {
            dateRangeQuery.$lte = new Date(endDate);
          }
        query.Day = dateRangeQuery;
      }
  
      // Fetch data from the database
      const data = await DataModel.find(query);
  
      res.json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
    
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));