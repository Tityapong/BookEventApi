const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to start the Google authentication process
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route to handle the response from Google after authentication
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful login, redirect to a protected route or send user data
    res.json({ message: 'Google login successful', user: req.user });
  }
);

module.exports = router;
