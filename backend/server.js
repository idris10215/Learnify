import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import moduleRoutes from './routes/moduleRoutes.js';
import uploadROutes from './routes/uploadRoutes.js';
import classRoutes from './routes/classRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Successfully connected to the Learnify records room (MongoDB)!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}


app.use('/api/modules', moduleRoutes);

app.use('/api/upload', uploadROutes);

app.use('/api/classes', classRoutes);


connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


app.get('/', (req, res) => {
  res.send('Hello from the backend server!');
});
