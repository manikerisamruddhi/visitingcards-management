// const express = require("express");
// const app = express();
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectToMongoDB = require("./db/connectToDb"); // Import the connectToMongoDB function

// dotenv.config(); // Load environment variables from .env

// const authRoute = require("./routes/auth.routes.js");
// const userRoute = require("./routes/user.route.js");
// const cardRoute = require("./routes/card.routes.js");

// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(cookieParser());

// const port = process.env.PORT || 3000;

// // Connect to the database
// connectToMongoDB()
//   .then(() => {
//     console.log("Connected to the database successfully.");

//     // Start the server after the database connection is established
//     app.listen(port, () => {
//       console.log("Server is listening on port:", port);
//     });
//   })
//   .catch((error) => {
//     console.error("Database connection failed:", error.message);
//     process.exit(1); // Exit the process if the connection fails
//   });

// // API routes
// app.use("/api/auth", authRoute);
// app.use("/api/user", userRoute);
// app.use("/api/card", cardRoute);



const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoute = require("./routes/auth.routes.js");
const userRoute = require("./routes/user.route.js");
const cardRoute = require("./routes/card.routes.js");

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

// Middleware setup
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
