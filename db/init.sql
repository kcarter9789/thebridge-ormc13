CREATE DATABASE ecommerce_db;

CREATE USER 'appuser'@'localhost' IDENTIFIED BY 'AppUser2012';

GRANT ALL PRIVILEGES ON ecommerce_db.* TO 'appuser'@'%';

FLUSH PRIVILEGES;