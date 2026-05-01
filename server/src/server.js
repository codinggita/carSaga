require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Route imports
const authRoutes = require('./routes/auth.routes');
const carRoutes = require('./routes/car.routes');
const reportRoutes = require('./routes/report.routes');
const chatRoutes = require('./routes/chat.routes');
const mechanicRoutes = require('./routes/mechanic.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const carDatabaseRoutes = require('./routes/carDatabase.routes');

// Middleware imports
const { errorHandler, notFound } = require('./middlewares/error.middleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Static uploads folder
app.use('/uploads', express.static('uploads'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/mechanics', mechanicRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/car-database', carDatabaseRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'CarSaga API is running' });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 CarSaga server running on port ${PORT}`);
});
