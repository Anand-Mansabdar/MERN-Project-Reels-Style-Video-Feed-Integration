const mongoose = require("mongoose");

async function connectDB() {
  try {
    mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("MongoDB connected");
    });
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
}

module.exports = connectDB;