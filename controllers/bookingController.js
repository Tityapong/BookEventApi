// Import the configured pool
const pool = require('../config/db'); // Ensure this path is correct

// Controller to fetch supplier bookings
const getSupplierBookings = async (req, res) => {
  try {
    const supplierId = req.user.id;

    const query = `
      SELECT 
        b.id,
        b.event_date,
        b.status,
        b.created_at,
        b.updated_at,
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

    // Use the promise-based query
    const [results] = await pool.promise().query(query, [supplierId]);

    const bookings = results.map((booking) => ({
      id: booking.id,
      title: `${booking.user_name} - ${booking.service_name}`,
      start: booking.event_date,
      end: booking.event_date,
      status: booking.status,
      user: {
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
    console.error('Error fetching supplier bookings:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching bookings.',
    });
  }
};

// Controller to create a new booking by a user
const createBooking = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the JWT contains the user's id
    const { service_id, event_date } = req.body;

    // Input Validation
    if (!service_id || !event_date) {
      return res.status(400).json({ message: 'Service ID and Event Date are required.' });
    }

    // Check if the service exists and belongs to a supplier
    const [serviceResults] = await pool.promise().query('SELECT * FROM services WHERE id = ?', [service_id]);

    if (serviceResults.length === 0) {
      return res.status(404).json({ message: 'Service not found.' });
    }

    const service = serviceResults[0];
    const supplierId = service.supplier_id;

    // Optionally, check if the supplier is approved
    // const [supplierResults] = await pool.promise().query('SELECT * FROM Users WHERE id = ? AND isApproved = ?', [supplierId, 1]);
    // if (supplierResults.length === 0) {
    //   return res.status(403).json({ message: 'Supplier not approved.' });
    // }

    // Insert the booking into the database
    const [insertResult] = await pool.promise().query(
      'INSERT INTO bookings (user_id, service_id, event_date, status, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
      [userId, service_id, event_date, 'Pending'] // Status can be 'Pending', 'Confirmed', etc.
    );

    // Fetch the newly created booking
    const [bookingResults] = await pool.promise().query('SELECT * FROM bookings WHERE id = ?', [insertResult.insertId]);
    const booking = bookingResults[0];

    res.status(201).json({
      success: true,
      message: 'Booking created successfully.',
      data: {
        id: booking.id,
        service_id: booking.service_id,
        event_date: booking.event_date,
        status: booking.status,
        created_at: booking.created_at,
        updated_at: booking.updated_at,
      },
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the booking.',
    });
  }
};

module.exports = { getSupplierBookings, createBooking };
