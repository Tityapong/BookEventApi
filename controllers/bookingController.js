// Import the configured pool
const pool = require('../config/db'); // Ensure this path is correct

/**
 * Controller to fetch supplier bookings
 */
const getSupplierBookings = async (req, res) => {
  try {
    const supplierId = req.user.id; // Assuming supplier ID is derived from the authenticated user's token

    const query = `
      SELECT 
        b.id AS booking_id,
        b.event_date,
        b.status,
        b.created_at,
        b.updated_at,
        b.contact_name,
        b.contact_email,
        b.contact_phone,
        u.id AS user_id,
        u.name AS user_name,
        u.email AS user_email,
        u.phone AS user_phone,
        s.id AS service_id,
        s.name AS service_name
      FROM bookings b
      JOIN Users u ON b.user_id = u.id
      JOIN services s ON b.service_id = s.id
      WHERE s.supplier_id = ?
      ORDER BY b.created_at DESC
    `;

    const [results] = await pool.promise().query(query, [supplierId]);

    const bookings = results.map((booking) => ({
      booking_id: booking.booking_id,
      service: {
        id: booking.service_id,
        name: booking.service_name,
      },
      event_date: booking.event_date,
      status: booking.status,
      created_at: booking.created_at,
      updated_at: booking.updated_at,
      contact_name: booking.contact_name,
      contact_email: booking.contact_email,
      contact_phone: booking.contact_phone,
      user: {
        id: booking.user_id,
        name: booking.user_name,
        email: booking.user_email,
        phone: booking.user_phone,
      },
    }));

    res.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error('Error fetching supplier bookings:', error.message);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching bookings.',
    });
  }
};


/**
 * Controller to create a new booking by a user
 */
const createBooking = async (req, res) => {
  try {
    // Destructure the booking details from the request body
    const { service_id, event_date, name, email, phone } = req.body;

    // Input Validation
    if (!service_id || !event_date || !name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Service ID, event date, name, email, and phone are required.',
      });
    }

    console.log('Booking request data:', { service_id, event_date, name, email, phone });

    const userId = req.user.id; // Use authenticated user's ID

    // Check if the service exists
    const [serviceResults] = await pool.promise().query('SELECT * FROM services WHERE id = ?', [service_id]);
    if (serviceResults.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Service not found.',
      });
    }

    const service = serviceResults[0];
    const supplierId = service.supplier_id;

    // Insert the booking into the database with contact information
    const [insertBookingResult] = await pool.promise().query(
      `INSERT INTO bookings 
        (user_id, service_id, event_date, status, contact_name, contact_email, contact_phone, created_at, updated_at) 
       VALUES 
        (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [userId, service_id, event_date, 'Pending', name, email, phone]
    );

    console.log('Booking insertion result:', insertBookingResult);

    // Fetch the newly created booking
    const [bookingResults] = await pool.promise().query('SELECT * FROM bookings WHERE id = ?', [insertBookingResult.insertId]);
    const booking = bookingResults[0];

    res.status(201).json({
      success: true,
      message: 'Booking created successfully.',
      data: {
        id: booking.id,
        service_id: booking.service_id,
        event_date: booking.event_date,
        status: booking.status,
        contact_name: booking.contact_name,
        contact_email: booking.contact_email,
        contact_phone: booking.contact_phone,
        created_at: booking.created_at,
        updated_at: booking.updated_at,
      },
    });
  } catch (error) {
    console.error('Error creating booking:', error.message, error.stack);
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the booking.',
      error: error.message, // Detailed error reporting
    });
  }
};


const acceptBooking = async (req, res) => {
  try {
    console.log('User Details:', req.user); // Debugging: Log the user details

    const supplierId = req.user.id; // Supplier ID from the authenticated user
    const { id } = req.params; // Booking ID from the URL params

    if (req.user.role !== 'supplier') {
      return res.status(403).json({ success: false, message: 'Access denied. Only suppliers can accept bookings.' });
    }

    // Check if the booking exists and belongs to the supplier's service
    const queryCheck = `
      SELECT b.id, b.user_id, s.supplier_id
      FROM bookings b
      JOIN services s ON b.service_id = s.id
      WHERE b.id = ? AND s.supplier_id = ?
    `;

    const [bookingResults] = await pool.promise().query(queryCheck, [id, supplierId]);

    if (bookingResults.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found or not authorized.',
      });
    }

    const userId = bookingResults[0].user_id;

    // Update the booking status to "Confirmed"
    const queryUpdate = `
      UPDATE bookings
      SET status = 'Confirmed', updated_at = NOW()
      WHERE id = ?
    `;
    await pool.promise().query(queryUpdate, [id]);

    // Insert a notification for the user
    const notificationMessage = 'Your booking has been accepted by the supplier.';
    const queryNotification = `
      INSERT INTO notifications (user_id, booking_id, message, is_read, created_at)
      VALUES (?, ?, ?, ?, NOW())
    `;
    await pool.promise().query(queryNotification, [userId, id, notificationMessage, false]);

    res.status(200).json({
      success: true,
      message: 'Booking accepted successfully, and notification sent to the user.',
      data: {
        booking_id: id,
        status: 'Confirmed',
      },
    });
  } catch (error) {
    console.error('Error accepting booking:', error.message);
    res.status(500).json({
      success: false,
      message: 'An error occurred while accepting the booking.',
      error: error.message,
    });
  }
};

/**
 * Controller to fetch user's own booking history
 */
const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id; // Authenticated user's ID from the JWT token

    const query = `
      SELECT 
        b.id AS booking_id,
        b.event_date,
        b.status,
        b.contact_name,
        b.contact_email,
        b.contact_phone,
        b.created_at AS booking_time,
        b.updated_at,
        s.id AS service_id,
        s.name AS service_name,
        s.location AS service_location,
        s.price AS service_price,
        u.name AS supplier_name,
        u.email AS supplier_email

      FROM bookings b
      JOIN services s ON b.service_id = s.id
      JOIN Users u ON s.supplier_id = u.id
      WHERE b.user_id = ? -- Only fetch bookings for the authenticated user
      ORDER BY b.created_at DESC
    `;

    // Execute the query with the user's ID
    const [results] = await pool.promise().query(query, [userId]);

    // Format the response to make it clean
    const bookings = results.map((booking) => ({
      booking_id: booking.booking_id,
      event_date: booking.event_date,
      status: booking.status,
      contact_name: booking.contact_name,
      contact_email: booking.contact_email,
      contact_phone: booking.contact_phone,
      booking_time: booking.booking_time,
      updated_at: booking.updated_at,
      service: {
        id: booking.service_id,
        name: booking.service_name,

        location: booking.service_location,
        price: booking.service_price,
        supplier_name: booking.supplier_name,
        supplier_email: booking.supplier_email,
      },
    }));

    res.status(200).json({
      success: true,
      message: 'Your booking history retrieved successfully.',
      data: bookings,
    });
  } catch (error) {
    console.error('Error fetching user booking history:', error.message);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching your booking history.',
      error: error.message,
    });
  }
};

const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('Fetching notifications for user ID:', userId);

    const query = `
      SELECT id, booking_id, message, is_read, created_at
      FROM notifications
      WHERE user_id = ?
      ORDER BY created_at DESC
    `;

    const [notifications] = await pool.promise().query(query, [userId]);
    console.log('Notifications fetched:', notifications);

    res.status(200).json({
      success: true,
      message: 'Notifications retrieved successfully.',
      data: notifications,
    });
  } catch (error) {
    console.error('Error fetching notifications:', error.message);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching notifications.',
      error: error.message,
    });
  }
};


/**
 * Controller to reject a booking by a supplier
 */
const rejectBooking = async (req, res) => {
  try {
    console.log('User Details:', req.user); // Debugging: Log the user details

    const supplierId = req.user.id; // Supplier ID from the authenticated user
    const { id } = req.params; // Booking ID from the URL params

    // Ensure the user has the 'supplier' role
    if (req.user.role !== 'supplier') {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Only suppliers can reject bookings.' 
      });
    }

    // Check if the booking exists and belongs to the supplier's service
    const queryCheck = `
      SELECT b.id, b.user_id, b.status, s.supplier_id
      FROM bookings b
      JOIN services s ON b.service_id = s.id
      WHERE b.id = ? AND s.supplier_id = ?
    `;

    const [bookingResults] = await pool.promise().query(queryCheck, [id, supplierId]);

    if (bookingResults.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found or not authorized.',
      });
    }

    const booking = bookingResults[0];

    // Optional: Check if the booking is in a state that can be rejected
    if (booking.status !== 'Pending') {
      return res.status(400).json({
        success: false,
        message: `Cannot reject a booking with status '${booking.status}'.`,
      });
    }

    const userId = booking.user_id;

    // Update the booking status to "Rejected"
    const queryUpdate = `
      UPDATE bookings
      SET status = 'Rejected', updated_at = NOW()
      WHERE id = ?
    `;
    await pool.promise().query(queryUpdate, [id]);

    // Insert a notification for the user
    const notificationMessage = 'Your booking has been rejected by the supplier.';
    const queryNotification = `
      INSERT INTO notifications (user_id, booking_id, message, is_read, created_at)
      VALUES (?, ?, ?, ?, NOW())
    `;
    await pool.promise().query(queryNotification, [userId, id, notificationMessage, false]);

    res.status(200).json({
      success: true,
      message: 'Booking rejected successfully, and notification sent to the user.',
      data: {
        booking_id: id,
        status: 'Rejected',
      },
    });
  } catch (error) {
    console.error('Error rejecting booking:', error.message);
    res.status(500).json({
      success: false,
      message: 'An error occurred while rejecting the booking.',
      error: error.message,
    });
  }
};




module.exports = { getSupplierBookings, createBooking  , acceptBooking , getUserBookings , getUserNotifications , rejectBooking} ;
