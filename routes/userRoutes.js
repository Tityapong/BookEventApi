const express = require('express');
const userController = require('../controllers/userController'); // Importing the controller
const { register, login, authorize, adminRoute, supplierRoute, userRoute, changeRole } = require('../controllers/userController');

const router = express.Router();

// Register a user
router.post('/register', userController.register);

// Login a user
router.post('/login', userController.login);

// Protected routes
router.get('/admin', userController.authorize(['Admin']), userController.adminRoute);
router.get('/suppliers', userController.authorize(['Supplier', 'Admin']), userController.supplierRoute);
router.get('/user', userController.authorize(['User', 'Admin', 'Supplier']), userController.userRoute);
// Admin role management route
router.post('/change-role', authorize(['Admin']), changeRole);
// Admin: Get all users
router.get('/users', authorize(['Admin']), userController.getAllUsers);


module.exports = router;
