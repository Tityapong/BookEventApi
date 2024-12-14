const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Importing the database connection
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const SECRET_KEY = process.env.SECRET_KEY;




passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:8000/users/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      const { id, displayName, emails } = profile;
      const email = emails[0].value;

      db.query('SELECT * FROM Users WHERE googleId = ?', [id], (err, results) => {
        if (err) return done(err);

        if (results.length > 0) {
          // User exists
          return done(null, results[0]);
        } else {
          // Insert new user
          // db.query(
          //   'INSERT INTO Users (googleId, name, email, password) VALUES (?, ?, ?, ?)',
          //   [id, displayName, email, null], // Set password to NULL for Google users
          //   (err, results) => {
          //     if (err) return done(err);
          //     db.query('SELECT * FROM Users WHERE id = ?', [results.insertId], (err, user) => {
          //       if (err) return done(err);
          //       return done(null, user[0]);
          //     });
          //   }
          // );
          db.query(
            'INSERT INTO Users (googleId, name, email, password, location) VALUES (?, ?, ?, ?, ?)',
            [id, displayName, email, null, 'default location'], // Set 'default location' as a placeholder if location is unknown
            (err, results) => {
              if (err) return done(err);
              db.query('SELECT * FROM Users WHERE id = ?', [results.insertId], (err, user) => {
                if (err) return done(err);
                return done(null, user[0]);
              });
            }
          );
          
        }
      });
    }
  )
);

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser((id, done) => {
  db.query('SELECT * FROM Users WHERE id = ?', [id], (err, results) => {
    if (err) return done(err);
    done(null, results[0]);
  });
});


// Register a user
// Register a user
const register = async (req, res) => {
    const { name, email, password, phone, location } = req.body;

    // Default role to 'User' if not provided
    const role = req.body.role || 'User'; 

    // Validate role, to ensure no one can assign 'Admin' by default
    if (role !== 'User' && role !== 'Supplier') {
      return res.status(400).json({ message: 'Invalid role', body: null });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    db.query(
      'INSERT INTO Users (name, email, password, role, phone, location, isApproved) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, hashedPassword, role, phone, location, role === 'Admin' ? true : false],
      (err) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Email already exists', body: null });
          }
          return res.status(500).json({ message: 'Database error', body: err.message });
        }
        res.status(201).json({ message: 'User registered successfully', body: { name, email, phone, location, role } });
      }
    );
};

  
// Login
const login = (req, res) => {
    const { email, password } = req.body;
  
    // Find user in the database
    db.query('SELECT * FROM Users WHERE email = ?', [email], async (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error', body: err.message });
      if (results.length === 0) return res.status(400).json({ message: 'User not found', body: null });
  
      const user = results[0];
  
      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(400).json({ message: 'Invalid password', body: null });
  
      // Generate token
      const token = jwt.sign({ id: user.id, name: user.name, role: user.role }, SECRET_KEY, {
        expiresIn: '1h',
      });
      res.json({ message: 'Login successful', body: { token } });
    });
  };
  
// Middleware for role-based access
const authorize = (roles) => (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'Token is required' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;

    // Check if user's role is allowed
    if (!roles.includes(decoded.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
};

// Admin route
const adminRoute = (req, res) => {
  res.json({ message: 'Welcome Admin!' });
};

// Supplier route
const supplierRoute = (req, res) => {
  res.json({ message: `Welcome Supplier! ${req.user.name} ` });
};

// Admin role management (Change role)
const changeRole = (req, res) => {
    const { userId, newRole } = req.body;
  
    // Ensure the role is valid
    if (!['Supplier', 'User'].includes(newRole)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
  
    // Ensure that the requesting user is an Admin
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
  
    // Update the user's role
    db.query(
      'UPDATE Users SET role = ? WHERE id = ?',
      [newRole, userId],
      (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Database error', error: err.message });
        }
  
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        res.status(200).json({ message: `User's role changed to ${newRole}` });
      }
    );
  };


  // Admin: Get all users
const getAllUsers = (req, res) => {
  // Ensure that the requesting user is an Admin
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  db.query('SELECT id, name, email, role, phone, location FROM Users', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    res.status(200).json({ message: 'All users retrieved successfully', users: results });
  });
};

  

// User route
const userRoute = (req, res) => {
  res.json({ message: `Welcome User, ${req.user.name}!` });
};

// Export functions
module.exports = { register, login, authorize, adminRoute, supplierRoute, userRoute  , changeRole ,getAllUsers};
