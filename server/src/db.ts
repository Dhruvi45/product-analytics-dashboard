import mongoose from 'mongoose';
import dotenv from 'dotenv';
import DataModel from './dataModal';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    console.log('MONGODB_URI',process.env.MONGODB_URI)
    const url = 'mongodb+srv://dhruvijoshi45:86OQImllKA7SUmsz@cluster0.dyvfzoo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    await mongoose.connect(url as string);
    console.log('MongoDB connected');
    
  } catch (error) {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  }
};

export default connectDB;