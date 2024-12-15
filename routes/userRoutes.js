const express = require("express");
const {
  register,
  login,
  adminRoute,
  supplierRoute,
  userRoute,
  changeRole,
  getAllUsers,
  deleteUser
} = require("../controllers/userController");
const {authorize}  = require("../middleware/authorize"); // Import role-based middleware



const router = express.Router();

// Public Routes
router.post("/register", register); // Register a user
router.post("/login", login); // Login a user

// Protected Routes
router.get("/admin", authorize(["Admin"]), adminRoute); // Admin-only route
router.get("/suppliers", authorize(["Supplier", "Admin"]), supplierRoute); // Supplier and Admin route
router.get("/user", authorize(["User", "Admin", "Supplier"]), userRoute); // General user route

// Admin Role Management
router.post("/change-role", authorize(["Admin"]), changeRole); // Change user role
router.get("/users", authorize(["Admin"]), getAllUsers); // Get all users
router.delete("/delete", authorize(["Admin"]), deleteUser); // Delete a user

module.exports = router;
