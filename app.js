const bcrypt = require('bcrypt');

// Hash the plain text password
bcrypt.hash('pongpong2233', 10).then((hashedPassword) => {
  console.log(hashedPassword);  // Copy this hashed value and update the password in your database
});
mysql://root:MhJpnXnprawDYwlGDguzLkEurDFqZhGZ@junction.proxy.rlwy.net:37895/railway