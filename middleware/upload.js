// middleware/upload.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary"); // Import configured Cloudinary instance

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "services", // Folder name in Cloudinary
        allowed_formats: ["jpg", "jpeg", "png"], // Allowed file formats
    },
});

// Multer middleware
const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
});

module.exports = upload;
