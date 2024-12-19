// const express = require("express");
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv");
// const session = require("express-session"); // Import express-session
// const passport = require("passport"); // Ensure you have passport installed
// const userRoutes = require("./routes/userRoutes"); // Import user routes
// const authRoutes = require("./routes/socaleRoute"); // Import authentication routes
// const serviceRoutes = require('./routes/serviceRoute');
// const supplierRoutes = require('./routes/supplierRoutes')
// // const bookingRoutes = require('./routes/bookingRoutes')
// const bookingRoute = require('./routes/bookingRoutes');
// // const cors = require("cors"); // Import CORS




// dotenv.config();

// const app = express();

// // Middleware
// app.use(bodyParser.json());

// // Session middleware
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "your-secret-key", // Use a secure secret key from .env
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// // Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// // Routes
// app.use('/users/auth', authRoutes);
// app.use("/api/users", userRoutes); // User-related routes

// app.use('/', serviceRoutes);

// // Middleware to serve uploaded images
// app.use('/uploads', express.static('uploads'));

// // Routes
// app.use('/supplier', supplierRoutes);

// app.use('/api', bookingRoute);

// const PORT = process.env.PORT || 8000;


// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors"); // Import CORS
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/socaleRoute");
const serviceRoutes = require('./routes/serviceRoute');
const supplierRoutes = require('./routes/supplierRoutes');
const bookingRoute = require('./routes/bookingRoutes');
const connectCloudinary = require('./config/cloudinary');
// const connectCloudinary = require('./config/cloudinary');

// // Connect to Cloudinary
// connectCloudinary();




// Load environment variables
dotenv.config();
const app = express(); // Initialize the app FIRST


app.use(cors());
// Middleware
app.use(bodyParser.json());

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);



// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use('/users/auth', authRoutes);
app.use("/api/users", userRoutes);
app.use('/', serviceRoutes);
// app.use('/uploads', express.static('uploads'));
app.use('/supplier', supplierRoutes);
app.use('/api', bookingRoute);

const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
