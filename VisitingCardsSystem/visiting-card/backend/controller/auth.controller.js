const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

const User = require("../models/user.model.js");
const JWT_SECRET = process.env.JWT_SECRET;



// Sign-up Function
const signUpController = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Please provide all required fields" });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
     
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(201).json({ message: "Signup successful", user: newUser, token });
  } catch (error) {
    console.error("Error in signUp controller:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};



// Sign-in Function
const signInController = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: "Please provide both username and password" });
    }

    // Check if the user exists in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
        id: user._id

      },
      token,
    });
  } catch (error) {
    console.error("Error in signIn controller:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};


const getUserDetails = async (req, res) => {
  try {
    // Get token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1]; // Bearer token

    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    // Decode the token to get user info
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find the user based on the decoded ID
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user details
    return res.status(200).json({
      username: user.username,
      email: user.email,
      role: user.role,
      id: user._id,
    });
  } catch (error) {
    console.error("Error in getUserDetails controller:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};



module.exports = {
  signUpController,
  signInController,
  getUserDetails
};

