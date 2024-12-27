// const express = require("express");
// const passport = require("passport");
// const jwt = require("jsonwebtoken");

// const router = express.Router();

// // Route to start the Google authentication process
// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// // Callback route to handle the response from Google after authentication
// router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   (req, res) => {
//     try {
//       const user = req.user;

//       // Create a JWT token with user data
//       const token = jwt.sign(
//         { userId: user.id, email: user.email, name: user.name },
//         "your-secret-key", // Use your secret key directly here
//         { expiresIn: "60d" }
//       );

//       // Redirect to frontend with token in query parameters
//       res.redirect(`http://localhost:3000/?token=${token}`); // Hardcoded frontend URL
//     } catch (error) {
//       console.error("Error generating token:", error);
//       res.redirect("/error"); // Redirect to an error page in case of failure
//     }
//   }
// );

// module.exports = router;
const express = require("express");
const passport = require("passport");
// const jwt = require("jsonwebtoken");

const router = express.Router();

// Route to start the Google authentication process
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route to handle the response from Google after authentication
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    try {
      // The user is authenticated and stored in req.user by Passport

      // You can now use the user information stored in req.user to handle the session
      const user = req.user;
      
      // You don't need a JWT token anymore if you are using session-based authentication

      // Redirect to the frontend without a token (optional)
      res.redirect("http://localhost:3000/");  // Redirecting to homepage or user dashboard
    } catch (error) {
      console.error("Error during authentication:", error);
      res.redirect("/error"); // Redirect to an error page in case of failure
    }
  }
);

module.exports = router;
