const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('../routers/userRoute');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Init middleware to parse JSON
app.use(express.json())
app.use(cors());
app.use(cookieParser());


// Async function to connect to MongoDB and then start the server
const startServer = async () => {
  try {
    // Wait for the MongoDB connection
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

   console.log('Connected to MongoDB');

    // If MongoDB connection is successful, start the server
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1); // Exit process with failure
  }
};

app.use('/api', userRoute);

module.exports =  startServer

// // Start the server with MongoDB connection
// startServer();

// app.get('/', (req, res) => {
//   res.send('Hello, MongoDB and Express!');
// });
