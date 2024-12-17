

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoute = require("./routes/auth.routes.js");
const userRoute = require("./routes/user.route.js");
const cardRoute = require("./routes/card.routes.js");
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*", // Update this to restrict origins in production
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// MongoDB connection logic
const connectToMongoDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    // Ensure that MONGO_DB_URL exists in your .env file
    await mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.log("Error while connecting to MongoDB:", error.message);
    process.exit(1); // Terminate the app if the database connection fails
  }
};

// Connect to MongoDB and start the server
connectToMongoDB().then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

// Define routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/card", cardRoute);
