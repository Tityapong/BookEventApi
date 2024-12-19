// config/cloudinary.js
const { v2: cloudinary } = require("cloudinary");

const connectCloudinary = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY,
        });
        console.log("Cloudinary connected successfully");
    } catch (error) {
        console.error("Error connecting to Cloudinary:", error.message);
        throw new Error("Cloudinary connection failed");
    }

    return cloudinary; // Export configured Cloudinary instance
};

module.exports = connectCloudinary();
