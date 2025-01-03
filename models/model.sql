CREATE TABLE booking.Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    location VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'Supplier', 'User') NOT NULL,
    isApproved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE service_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
SHOW DATABASES;

CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_id INT NOT NULL,
    category_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    size VARCHAR(50) NULL, 
    image VARCHAR(255), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES booking.Users(id),
    FOREIGN KEY (category_id) REFERENCES service_categories(id)
);



SELECT * FROM Users;
DELETE FROM Users WHERE id = 6;

SELECT id, name FROM service_categories;
SET SQL_SAFE_UPDATES = 1;
SHOW CREATE TABLE Users;
ALTER TABLE Users DROP COLUMN role_id;



SELECT * FROM services;

SET SQL_SAFE_UPDATES = 0;

UPDATE service_categories SET name = TRIM(name);



SELECT * FROM bookings WHERE service_id = '2';
DELETE FROM bookings WHERE service_id = '2';



DESCRIBE services;

SELECT * FROM services;
ALTER TABLE services 
ADD COLUMN location VARCHAR(255) NULL AFTER size;

ALTER TABLE services
MODIFY COLUMN image LONGTEXT;



ALTER TABLE Users ADD COLUMN role_id INT NOT NULL DEFAULT 3;


SELECT * FROM bookings;
ALTER TABLE bookings 
MODIFY status ENUM('Pending', 'Confirmed', 'Rejected') NOT NULL DEFAULT 'Pending';

UPDATE Users SET role_id = 3 WHERE role_id IS NULL;




CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    service_id INT NOT NULL,
    event_date DATE NOT NULL,
    status ENUM('Pending', 'Confirmed', 'Cancelled') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES booking.Users(id),
    FOREIGN KEY (service_id) REFERENCES services(id)
);


CREATE TABLE booking.notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    booking_id INT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES booking.Users(id) ON DELETE CASCADE,
    FOREIGN KEY (booking_id) REFERENCES booking.bookings(id) ON DELETE SET NULL
);
SELECT * FROM notifications;

SELECT * FROM bookings;
SELECT * FROM services;

SELECT * FROM services;


SELECT * FROM service_ratings ;
CREATE TABLE service_ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    service_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),  -- Rating scale between 1 and 5
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES booking.Users(id),
    FOREIGN KEY (service_id) REFERENCES services(id)
);

ALTER TABLE services
ADD COLUMN average_rating DECIMAL(3, 2) DEFAULT NULL;
UPDATE services
SET average_rating = (
  SELECT AVG(rating) FROM service_ratings WHERE service_id = ?
)
WHERE id = ?


USE booking;
INSERT INTO booking.Users (name, email, password, role, is_approved, location)   
VALUES ('Tityapong', 'tityapongs@gmail.com', '$2b$12$Z5GbrkCdknO1oJBQ8OwinezdQMgpA1qpkkD4ckaQKwSHkAzxZa3MO', 'Admin', TRUE, 'Phnom Penh');

ALTER TABLE booking.Users
ADD COLUMN is_approved BOOLEAN DEFAULT FALSE;



UPDATE Users
SET role = 'User'
WHERE googleId = '110175582670742480492'; 


SELECT * FROM Users WHERE role_id = 2;

UPDATE Users
SET role = 'Supplier'
WHERE role_id = 2;




SET SQL_SAFE_UPDATES = 1;
SET SQL_SAFE_UPDATES = 0;



UPDATE Users
SET role = 'Admin'
WHERE role_id = 1 AND id IS NOT NULL;

UPDATE Users
SET role = 'User'
WHERE role_id = 3 AND id IS NOT NULL;

UPDATE Users
SET role = 'Supplier'
WHERE role_id = 2 AND id IS NOT NULL;



ALTER TABLE Users ADD COLUMN googleId VARCHAR(255) UNIQUE;
ALTER TABLE Users MODIFY COLUMN password VARCHAR(255) NULL;
ALTER TABLE Users MODIFY COLUMN location VARCHAR(255) DEFAULT NULL;

ALTER TABLE bookings
ADD COLUMN contact_name VARCHAR(255) NOT NULL,
ADD COLUMN contact_email VARCHAR(255) NOT NULL,
ADD COLUMN contact_phone VARCHAR(50) NOT NULL;



INSERT INTO bookings (user_id, service_id, event_date, status)
VALUES (3, 1, '2024-12-25', 'Pending');




CREATE TABLE contact (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
