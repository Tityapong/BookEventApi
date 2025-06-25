

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
const contactRoute = require('./routes/contactRoutes')

const connectCloudinary = require('./config/cloudinary');
// const upload = require("./middleware/upload");
// const connectCloudinary = require('./config/cloudinary');

// // Connect to Cloudinary
// connectCloudinary();

const bot = require("./controllers/telegramBotWebhook");





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
app.use('/api', contactRoute);


// app.post("/debug-files", upload.array("images", 3), (req, res) => {
//   console.log("req.files:", JSON.stringify(req.files, null, 2));
//   res.json({ files: req.files });
// });
const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

