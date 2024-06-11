const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multilingualRoutes = require('./routes/multilingualRoutes');
const visionRoutes = require('./routes/visionRoutes');
const newsRoutes = require('./routes/newsRoutes');
const festivalRoutes = require('./routes/festivalRoutes');
const contactformRoutes = require('./routes/contactformRoutes');
const logger = require('./logger');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => logger.info('Connected to MongoDB'))
  .catch(err => logger.error('Failed to connect to MongoDB', { error: err.message }));

// Use routes
app.use('/api', multilingualRoutes);
app.use('/api/vision', visionRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/festival', festivalRoutes);
app.use('/api/contact', contactformRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
