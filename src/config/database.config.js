import mongoose from 'mongoose';
import env from './environment.config.js';

const connectDB = async () => {
    try {
        // Kết nối MongoDB sử dụng Mongoose
        await mongoose.connect(env.MONGODB_URI);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Nếu kết nối thất bại, dừng ứng dụng
    }
};

export default connectDB;
