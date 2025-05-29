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
  rolename VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS user_roles (
  user_id INT,
  role_id INT,
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
	id INT PRIMARY KEY,
    publisher_id INT,
    address VARCHAR(255),
    num_of_rooms DECIMAL(3,1),
    area DOUBLE,
    floor_number INT,
    details TEXT,
    FOREIGN KEY (publisher_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS images(
	id INT AUTO_INCREMENT PRIMARY KEY,
    apartment_id INT,
    image_url VARCHAR(255),
    FOREIGN KEY (apartment_id) REFERENCES apartments(id)
);

