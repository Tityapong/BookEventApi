const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const session = require("express-session"); // Import express-session
const passport = require("passport"); // Ensure you have passport installed
const userRoutes = require("./routes/userRoutes"); // Import user routes
const authRoutes = require("./routes/socaleRoute"); // Import authentication routes

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key", // Use a secure secret key from .env
    resave: false,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/users/auth', authRoutes);
app.use("/api/users", userRoutes); // User-related routes

const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
