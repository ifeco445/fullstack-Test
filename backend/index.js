// server.js
const startServer = require('./config/db');
const express = require('express');
//const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoute = require('./routers/userRoute');
const cookieParser = require('cookie-parser');

dotenv.config();


const app = express();

console.log
// Init middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', userRoute);
app.use(cookieParser)
//app.use(bodyParser.json());
// Define routes
app.use('/api', userRoute);

//const PORT = process.env.PORT || 5000;
startServer()

