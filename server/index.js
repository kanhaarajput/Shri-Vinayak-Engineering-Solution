require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(require('path').join(__dirname, 'uploads')));

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const servicesRoutes = require('./routes/services');
const galleryRoutes = require('./routes/gallery');
const siteContentRoutes = require('./routes/siteContent');
const messagesRoutes = require('./routes/messages');
const uploadRoutes = require('./routes/upload');
const teamRoutes = require('./routes/team');
const futureVisionRoutes = require('./routes/futureVision');
const machinesRoutes = require('./routes/machines');
const goalsRoutes = require('./routes/goals');
const innovationRoutes = require('./routes/innovation');
const testimonialsRoutes = require('./routes/testimonials');
const featuresRoutes = require('./routes/features');
const workflowRoutes = require('./routes/workflow');
const machineryRoutes = require('./routes/machinery');
const videosRoutes = require('./routes/videos');
const industriesRoutes = require('./routes/industries');
const categoriesRoutes = require('./routes/categories');
const beforeAfterRoutes = require('./routes/beforeAfter');

app.use('/api/services', servicesRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/site-content', siteContentRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/future-vision', futureVisionRoutes);
app.use('/api/machines', machinesRoutes);
app.use('/api/goals', goalsRoutes);
app.use('/api/innovation', innovationRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/features', featuresRoutes);
app.use('/api/workflow', workflowRoutes);
app.use('/api/machinery', machineryRoutes);
app.use('/api/videos', videosRoutes);
app.use('/api/industries', industriesRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/before-after', beforeAfterRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Global error handler — catches any unhandled errors from all routes/middleware
app.use((err, req, res, next) => {
  console.error('UNHANDLED SERVER ERROR:', err);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
