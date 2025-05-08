// config/db.js
const mongoose = require('mongoose');

const connectDB = () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    throw new Error('MONGO_URI not found in environment variables');
  }

  return mongoose.connect(mongoURI);
};

module.exports = connectDB;
