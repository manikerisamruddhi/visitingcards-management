const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectToMongoDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    // Ensure you have the correct MongoDB URI in your .env file
    await mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error while connecting to MongoDB:", error.message);
    throw new Error(error.message); // Ensure the error is thrown for proper handling
  }
};

module.exports = connectToMongoDB; // Export the function for use in other files
