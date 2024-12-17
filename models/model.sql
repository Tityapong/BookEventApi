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


SET SQL_SAFE_UPDATES = 0;

UPDATE service_categories SET name = TRIM(name);






SELECT * FROM services;
ALTER TABLE services 
ADD COLUMN location VARCHAR(255) NULL AFTER size;


ALTER TABLE Users ADD COLUMN role_id INT NOT NULL DEFAULT 3;


SELECT * FROM bookings;
ALTER TABLE bookings 
MODIFY status ENUM('Pending', 'Confirmed', 'Rejected') NOT NULL DEFAULT 'Pending';





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
ALTER TABLE bookings
ADD COLUMN contact_name VARCHAR(255) NOT NULL,
ADD COLUMN contact_email VARCHAR(255) NOT NULL,
ADD COLUMN contact_phone VARCHAR(50) NOT NULL;



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

USE booking;


ALTER TABLE booking.Users
ADD COLUMN is_approved BOOLEAN DEFAULT FALSE;

SELECT * FROM Users LIMIT 0, 1000;



ALTER TABLE Users ADD COLUMN googleId VARCHAR(255) UNIQUE;
ALTER TABLE Users MODIFY COLUMN password VARCHAR(255) NULL;
ALTER TABLE Users MODIFY COLUMN location VARCHAR(255) DEFAULT NULL;


INSERT INTO bookings (user_id, service_id, event_date, status)
VALUES (3, 1, '2024-12-25', 'Pending');
