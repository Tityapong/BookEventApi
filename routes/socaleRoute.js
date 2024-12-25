const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to start the Google authentication process
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// // Callback route to handle the response from Google after authentication
// router.get(
//   '/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//     // Successful login, redirect to a protected route or send user data
//     res.json({ message: 'Google login successful', user: req.user });
//   }
// );

// Callback route to handle the response from Google after authentication
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),  // Redirect to login page if authentication fails
  (req, res) => {
    // Check user role and redirect accordingly
    if (!req.user) {
      return res.redirect('/login');  // In case no user is found
    }

    // Redirect based on the role
    if (req.user.role === 'Admin') {
      // Redirect to the Admin dashboard if the role is Admin
      return res.redirect('/dashboard');
    } else if (req.user.role === 'Supplier') {
      // Redirect to the Supplier dashboard if the role is Supplier
      return res.redirect('/supplier/dashboard');
    } else {
      // Default to the home page for normal users
      return res.redirect('/');
    }
  }
);

module.exports = router;
