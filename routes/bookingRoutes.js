// routes/bookingRoute.js
const express = require('express');
const router = express.Router();
const { getSupplierBookings  , createBooking , acceptBooking , getUserBookings , getUserNotifications, rejectBooking, getReceiptBooking} = require('../controllers/bookingController'); // Corrected import path
const { authorize } = require('../middleware/authorize'); // Assuming middleware file is named auth.js

// Log to verify controller import
// console.log('getSupplierBookings:', getSupplierBookings); // Should log [AsyncFunction: getSupplierBookings]

// Route to get bookings for suppliers
router.get('/bookings', authorize(['supplier']), getSupplierBookings);

// Route for users to create a new booking
router.post('/bookings', authorize(['user']), createBooking);
// PUT /supplier/bookings/:id/accept - Accept a booking
router.put('/bookings/:id/accept', authorize(['supplier']), acceptBooking);

router.put('/bookings/:id/reject', authorize(['supplier']), rejectBooking);


router.get('/user/bookings', authorize(['user']), getUserBookings);

router.get('/user/receipt-booking/:id', authorize(['user']), getReceiptBooking);

router.get('/user/notifications', authorize(['user']), getUserNotifications);



module.exports = router;
