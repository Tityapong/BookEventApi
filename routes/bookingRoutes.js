// routes/bookingRoute.js
const express = require('express');
const router = express.Router();
const { getSupplierBookings  , createBooking} = require('../controllers/bookingController'); // Corrected import path
const { authorize } = require('../middleware/authorize'); // Assuming middleware file is named auth.js

// Log to verify controller import
// console.log('getSupplierBookings:', getSupplierBookings); // Should log [AsyncFunction: getSupplierBookings]

// Route to get bookings for suppliers
router.get('/bookings', authorize(['supplier']), getSupplierBookings);

// Route for users to create a new booking
router.post('/bookings', authorize(['user']), createBooking);

module.exports = router;
