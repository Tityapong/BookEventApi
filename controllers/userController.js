// controllers/userController.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db"); // Importing the database connection
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const SECRET_KEY = process.env.SECRET_KEY;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:"http://localhost:8000/users/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      const { id, displayName, emails } = profile;
      const email = emails && emails[0] ? emails[0].value : null;

      if (!email) {
        console.error("No email associated with this Google account");
        return done(new Error("No email associated with this Google account."));
      }

      console.log("Google Profile:", { id, displayName, email });

      db.query(
        "SELECT * FROM Users WHERE googleId = ?",
        [id],
        (err, results) => {
          if (err) {
            console.error("Database error (SELECT):", err);
            return done(err);
          }

          if (results.length > 0) {
            console.log("User found in database:", results[0]);

            // Set the role to "User" for the existing user
            results[0].role = "User";

            return done(null, results[0]);
          } else {
            console.log("User not found, inserting new user...");

            // Insert the new user with default role "User"
            db.query(
              "INSERT INTO Users (googleId, name, email, password, location, role, isApproved) VALUES (?, ?, ?, ?, ?, ?, ?)",
              [id, displayName, email, null, "default location", "User", 0],
              (err, results) => {
                if (err) {
                  console.error("Database error (INSERT):", err);
                  return done(err);
                }

                console.log("New user inserted:", results.insertId);

                db.query(
                  "SELECT * FROM Users WHERE id = ?",
                  [results.insertId],
                  (err, user) => {
                    if (err) {
                      console.error(
                        "Database error (SELECT after INSERT):",
                        err
                      );
                      return done(err);
                    }

                    // Ensure the role is set to "User" for the new user
                    user[0].role = "User"; // Override the role to "User"
                    console.log("New user retrieved:", user[0]);
                    return done(null, user[0]);
                  }
                );
              }
            );
          }
        }
      );
    }
  )
);

// Serialize user
passport.serializeUser((user, done) => {
  console.log("Serializing user:", user); // Debug log
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser((id, done) => {
  console.log("Deserializing user ID:", id); // Debug log
  db.query("SELECT * FROM Users WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Database error during deserialization:", err); // Debug log
      return done(err);
    }
    console.log("User deserialized:", results[0]); // Debug log

    // Ensure the role is set to "User" during deserialization
    results[0].role = "User"; // Override the role to "User"
    done(null, results[0]);
  });
});

// Register a user
const register = async (req, res) => {
  const { name, email, password, phone, location } = req.body;

  // Default role to 'user' if not provided
  const role = req.body.role ? req.body.role.toLowerCase() : "user";

  // Validate role, to ensure no one can assign 'admin' by default
  if (!["user", "supplier"].includes(role)) {
    return res.status(400).json({ message: "Invalid role", body: null });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user into the database
  db.query(
    "INSERT INTO Users (name, email, password, role, phone, location, is_approved) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      name,
      email,
      hashedPassword,
      role,
      phone,
      location,
      role === "admin" ? true : false,
    ],
    (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res
            .status(400)
            .json({ message: "Email already exists", body: null });
        }
        return res
          .status(500)
          .json({ message: "Database error", body: err.message });
      }
      res
        .status(201)
        .json({
          message: "User registered successfully",
          body: { name, email, phone, location, role },
        });
    }
  );
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  db.query(
    "SELECT * FROM Users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Database error", error: err.message });
      }

      if (results.length === 0) {
        return res.status(400).json({ message: "User not found" });
      }

      const user = results[0];

      try {
        // If the password is NULL (likely a Google user), we skip password verification
        let isPasswordValid = true;
        if (user.password) {
          isPasswordValid = await bcrypt.compare(password, user.password);
        }

        if (!isPasswordValid) {
          return res.status(400).json({ message: "Invalid password" });
        }

        // Generate JWT token with the user's role and id
        const token = jwt.sign(
          {
            id: user.id,
            name: user.name,
            role: user.role.toLowerCase(),
          },
          SECRET_KEY,
          { expiresIn: "60d" }
        );

        res.status(200).json({
          message: "Login successful",
          token,
          data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role.toLowerCase(),
            location: user.location,
          },
        });
      } catch (error) {
        return res
          .status(500)
          .json({
            message: "An error occurred during login",
            error: error.message,
          });
      }
    }
  );
};

// Admin route
const adminRoute = (req, res) => {
  res.json({ message: "Welcome Admin!" });
};

// Supplier route
const supplierRoute = (req, res) => {
  res.json({ message: `Welcome Supplier! ${req.user.name} ` });
};

// Admin role management (Change role)
const changeRole = (req, res) => {
  const { userId, newRole } = req.body;

  // Ensure the role is valid
  const newRoleLower = newRole.toLowerCase();
  if (!["supplier","admin" , "user"].includes(newRoleLower)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  // Ensure that the requesting user is an Admin
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  // Update the user's role
  db.query(
    "UPDATE Users SET role = ? WHERE id = ?",
    [newRoleLower, userId],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Database error", error: err.message });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res
        .status(200)
        .json({ message: `User's role changed to ${newRoleLower}` });
    }
  );
};

// Admin: Get all users
const getAllUsers = (req, res) => {
  // This check is now handled in the `authorize` middleware
  db.query(
    "SELECT id, name, email, role, phone, location , created_at AS joined FROM Users",
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Database error", error: err.message });
      }
      res
        .status(200)
        .json({ message: "All users retrieved successfully", users: results });
    }
  );
};

// Admin: Delete a user
const deleteUser = (req, res) => {
  const { userId } = req.body;

  // Ensure that the requesting user is an Admin
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  // Check if the user exists before trying to delete
  db.query("SELECT * FROM Users WHERE id = ?", [userId], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Proceed with deleting the user
    db.query("DELETE FROM Users WHERE id = ?", [userId], (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Database error", error: err.message });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User deleted successfully" });
    });
  });
};

const getMe = (req, res) => {
  console.log("Authenticated user in getMe:", req.user); // Log the authenticated user
  const userId = req.user?.id;

  if (!userId) {
    return res.status(400).json({ message: "User ID is missing in the token" });
  }

  db.query(
    "SELECT id, name, email, role, phone, location FROM Users WHERE id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.log("Database error:", err.message); // Log database error
        return res
          .status(500)
          .json({ message: "Database error", error: err.message });
      }

      if (results.length === 0) {
        console.log("User not found in database:", userId); // Log missing user
        return res.status(404).json({ message: "User not found" });
      }

      console.log("User retrieved:", results[0]); // Log retrieved user
      res
        .status(200)
        .json({
          message: "User profile retrieved successfully",
          user: results[0],
        });
    }
  );
};


// User route
const userRoute = (req, res) => {
  res.json({ message: `Welcome User, ${req.user.name}!` });
};
const getTotalUsers = (req, res) => {
  db.query("SELECT COUNT(*) AS totalUsers FROM Users", (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    }

    const totalUsers = results[0].totalUsers;
    res.status(200).json({
      message: "Total number of users retrieved successfully",
      totalUsers: totalUsers,
    });
  });
};


// Logout function
const logout = (req, res) => {
 
  res.clearCookie('token'); // Clear the token cookie if used
  
  // If you are storing JWT in localStorage on the frontend, the frontend should handle it.

  res.status(200).json({ message: "Logout successful" });
};



// Export functions
module.exports = {
  register,
  login,
  adminRoute,
  supplierRoute,
  userRoute,
  changeRole,
  getAllUsers,
  deleteUser,
  getMe,
  getTotalUsers,
  logout
};
