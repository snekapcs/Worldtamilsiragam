// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const multilingualRoutes = require('./routes/multilingualRoutes');
// const visionRoutes = require('./routes/visionRoutes');
// const newsRoutes = require('./routes/newsRoutes');
// const festivalRoutes = require('./routes/festivalRoutes');
// const contactformRoutes = require('./routes/contactformRoutes');
// const structureRoutes = require('./routes/structureRoutes');
// const adminRoutes = require('./routes/adminRoutes');
// const logger = require('./logger');
// const cors = require('cors');

// require('dotenv').config();

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// // // Serve uploaded files
// // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/public', express.static(__dirname + '/public'));

// // Connect to MongoDB
// const host = process.env.HOST;
// const dbname = process.env.DBNAME;
// const user = process.env.DB_USER;
// const password = process.env.PASSWORD;

// const uri = `mongodb://${user}:${password}@${host}/${dbname}?authSource=admin`;
// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => logger.info('Connected to MongoDB'))
//   .catch(err => logger.error('Failed to connect to MongoDB', { error: err.message }));

// // Use routes
// app.use('/api', multilingualRoutes);
// app.use('/api/vision', visionRoutes);
// app.use('/api/news', newsRoutes);
// app.use('/api/festival', festivalRoutes);
// app.use('/api/contact', contactformRoutes);
// app.use('/api/structure', structureRoutes);
// app.use('/api/admin', adminRoutes);

// app.get("/", (req, res) => {
//   return res.status(200).send(`Welcome to World Tamil siragam 🎉`);
// })
// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   logger.info(`Server is running on port ${PORT} ${host} ${dbname} ${user} ${password}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multilingualRoutes = require('./routes/multilingualRoutes');
const visionRoutes = require('./routes/visionRoutes');
const newsRoutes = require('./routes/newsRoutes');
const festivalRoutes = require('./routes/festivalRoutes');
const contactformRoutes = require('./routes/contactformRoutes');
const structureRoutes = require('./routes/structureRoutes');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const logger = require('./logger');
const cors = require('cors');
const { STATUS_CODES } = require('./util/constant');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/public', express.static(__dirname + '/public'));

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
app.use('/api/structure', structureRoutes);
app.use('/api/user', userRoutes);
app.use('/api/role', roleRoutes);

app.get("/", (req, res) => {
  return res.status(STATUS_CODES.SUCCESS).send(`Welcome to World Tamil siragam 🎉`);
})
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});