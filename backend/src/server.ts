import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db'; // Add this import
import authRoutes from './routes/authRoutes';

dotenv.config();

// Connect to MongoDB
connectDB(); // Add this line

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Test route
app.get('/api', (req, res) => {
  res.json({ 
    message: 'MediCart API is running!',
    status: 'operational',
    database: 'connected',
    environment: process.env.NODE_ENV
  });
});

app.use('/api/auth', authRoutes); 

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is healthy',
    timestamp: new Date()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});