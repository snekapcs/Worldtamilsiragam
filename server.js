const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// MongoDB connection:
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("DB CONNECTION SUCCESSFUL!");
}).catch((err) => {
  console.error(`DB CONNECTION FAILURE: ${err.message}`);
});

mongoose.connection.on('error', (err) => {
  console.error(`DB CONNECTION FAILURE: ${err.message}`);
});

// Import the createBilingualContent function from the controller
const { createBilingualContent } = require("./controllers/bilingual.controller");

app.listen(5000, () => {
  console.log("Server is running on port 5000");

  // Call the function to create bilingual content
  createBilingualContent();
});
