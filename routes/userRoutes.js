

const express = require("express");
const {
  register,
  login,
  adminRoute,
  supplierRoute,
  userRoute,
  changeRole,
  getAllUsers,
  deleteUser,
  getMe,
} = require("../controllers/userController");
const { authorize } = require("../middleware/authorize"); // Import role-based middleware

const router = express.Router();

// Public Routes
router.post("/register", register); // Register a new user
router.post("/login", login);       // Login a user

// Protected Routes (require authentication and specific roles)
router.get("/admin", authorize(["Admin"]), adminRoute); // Admin-only route
router.get("/suppliers", authorize(["Supplier", "Admin"]), supplierRoute); // Supplier and Admin route
router.get("/user", authorize(["User", "Admin", "Supplier"]), userRoute); // General user route accessible by all roles

// Route for authenticated users with role 'User' to view their profile
router.get("/me", authorize(["user"]), getMe); // Only users with the role 'User' can view their profile

// Admin Role Management
router.post("/change-role", authorize(["admin"]), changeRole); // Change user role (Admin only)
router.get("/users", authorize(["admin"]), getAllUsers); // Admin: Get all users
router.delete("/delete", authorize(["admin"]), deleteUser); // Admin: Delete a user

module.exports = router;
