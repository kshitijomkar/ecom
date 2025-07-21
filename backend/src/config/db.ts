import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string, {
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout for Windows users
      socketTimeoutMS: 45000, // Close sockets after 45s inactivity
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`❌ Connection Error: ${error.message}`);
    console.log('Tip: Ensure your MongoDB Atlas IP whitelist includes 0.0.0.0/0 temporarily');
    process.exit(1);
  }
};

// Windows-specific connection events
mongoose.connection.on('connecting', () => 
  console.log('Connecting to MongoDB Atlas...'));

mongoose.connection.on('disconnected', () => 
  console.warn('⚠️ MongoDB disconnected'));

export default connectDB;