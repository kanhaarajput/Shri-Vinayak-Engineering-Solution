require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
