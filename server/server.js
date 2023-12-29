const express = require('express');
const cors = require('cors');
const app = express ();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const userRouter = require("./router/user_router");

// Load environment variables from .env file
dotenv.config();

// Connection string
const mongoURI = process.env.MONGO_DATABASE;

// Connect to MongoDB 
(async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
})();

app.use(bodyParser.json({limit: "50mb"}));

const corsOptions = {
  origin: ["http://localhost:5173",],
  credentials: true, //included credentials as true
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
};

app.use(cors(corsOptions));

// Announce api request
app.use(morgan("common"))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser(process.env.SECURE_FLAG));

// ROUTE
app.use("/v1/user", userRouter);

app.listen(8000, () => {
   console.log("Server is running");
});