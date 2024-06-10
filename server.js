const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multilingualRoutes = require('./routes/multilingualRoutes');
const visionRoutes = require('./routes/visionRoutes');
const newsRoutes = require('./routes/newsRoutes');
const festivalRoutes = require('./routes/festivalRoutes');
const logger = require('./logger');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Worldtamilsiragam', {
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

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
