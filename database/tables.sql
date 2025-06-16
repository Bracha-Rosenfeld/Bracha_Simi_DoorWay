CREATE DATABASE IF NOT EXISTS mydatabase;
USE mydatabase;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(255) UNIQUE,
  address VARCHAR(255),
  longitude DOUBLE,
  latitude DOUBLE
);

CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role_name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS user_roles (
  user_id INT,
  role_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expiry_date DATE,
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS passwords (
  user_id INT PRIMARY KEY,
  password VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS apartments(
    id INT AUTO_INCREMENT PRIMARY KEY,
    publisher_id INT,
    address VARCHAR(255),
    longitude DOUBLE,
    latitude DOUBLE,
    city VARCHAR (255),
    price LONG,
    type ENUM('rent', 'sale'),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    title VARCHAR(255),  
    num_of_rooms DECIMAL(3,1),
    area DOUBLE,
    floor_number INT,
    details TEXT,
    is_approved BOOLEAN DEFAULT FALSE,
	image_url VARCHAR(255),
    FOREIGN KEY (publisher_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS carts (
  user_id INT,
  apartment_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, apartment_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (apartment_id) REFERENCES apartments(id)
);

-- CREATE TABLE IF NOT EXISTS images(
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     apartment_id INT,
--     image_url VARCHAR(255),
--     FOREIGN KEY (apartment_id) REFERENCES apartments(id)
-- );

INSERT INTO roles (role_name) VALUES ('admin'); 
INSERT INTO roles (role_name) VALUES ('publisher');
INSERT INTO roles (role_name) VALUES ('viewer');

-- DELIMITER $$
-- CREATE EVENT delete_expired_user_roles
-- ON SCHEDULE EVERY 1 DAY
-- STARTS TIMESTAMP(CURRENT_DATE + INTERVAL 0 HOUR)
-- DO
--   DELETE FROM user_roles WHERE expiry_date IS NOT NULL AND expiry_date < NOW();
-- &&
-- DELIMITER ;
-- insert one expired user role of viewer ti check if the evet works.
-- INSERT INTO user_roles (user_id, role_id, created_at, expiry_date)
-- VALUES (1, 3, '2025-03-12 19:34:30', '2025-06-15');

-- Running the event manually, one-time, immediately
-- SET SQL_SAFE_UPDATES = 0;
-- DELETE FROM user_roles  
-- WHERE expiry_date IS NOT NULL 
--   AND expiry_date < NOW()
--   AND user_id IS NOT NULL;
-- SET SQL_SAFE_UPDATES = 1;

  
SELECT * FROM users;
SELECT * FROM user_roles;
SELECT * FROM roles;
SELECT * FROM passwords ;
SELECT * FROM apartments;
--  DROP TABLE passwords;
--  DROP TABLE user_roles;
-- DROP TABLE carts;
--  DROP TABLE images;
-- DROP TABLE apartments;
--  DROP TABLE users;
-- DROP TABLE roles;