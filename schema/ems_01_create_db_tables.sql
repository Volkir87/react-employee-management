drop database if exists rems_db;

create database rems_db;

use rems_db;

CREATE TABLE `user` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` varchar(20),
  `first_name` varchar(255),
  `last_name` varchar(255),
  `password` varchar(255),
  `status_id` int,
  `created_date` timestamp DEFAULT (now()),
  `created_by` varchar(20)
);

CREATE TABLE `user_status` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `status` varchar(255),
  `description` varchar(2047)
);

CREATE TABLE `user_role` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `role_id` int,
  `assigned_date` timestamp DEFAULT (now()),
  `assigned_by` varchar(20)
);

CREATE TABLE `role` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `description` varchar(2047),
  `created_date` timestamp DEFAULT (now()),
  `created_by` varchar(20)
);

CREATE TABLE `employee` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `first_name` varchar(255),
  `last_name` varchar(255),
  `position_id` int,
  `manager_id` int,
  `created_date` timestamp DEFAULT (now()),
  `created_by` varchar(20),
  `start_date` timestamp,
  `termination_date` timestamp
);

CREATE TABLE `position` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `department_id` int,
  `created_date` timestamp DEFAULT (now()),
  `created_by` varchar(20)
);

CREATE TABLE `department` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `created_date` timestamp DEFAULT (now()),
  `created_by` varchar(255)
);

CREATE TABLE `employee_salary` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `employee_id` int,
  `salary` int,
  `updated_date` timestamp DEFAULT (now()),
  `updated_by` varchar(20)
);

CREATE TABLE `employee_status` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `description` varchar(255),
  `created_date` timestamp DEFAULT (now()),
  `created_by` varchar(255)
);

CREATE TABLE `employment_type` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `description` varchar(255),
  `created_date` timestamp DEFAULT (now()),
  `created_by` varchar(255)
);


ALTER TABLE `employee` ADD FOREIGN KEY (`manager_id`) REFERENCES `employee` (`id`);

ALTER TABLE `employee` ADD FOREIGN KEY (`position_id`) REFERENCES `position` (`id`);

ALTER TABLE `position` ADD FOREIGN KEY (`department_id`) REFERENCES `department` (`id`);

ALTER TABLE `employee_salary` ADD FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`);

ALTER TABLE `user_role` ADD FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);

ALTER TABLE `user_role` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `user` ADD FOREIGN KEY (`status_id`) REFERENCES `user_status` (`id`);

ALTER TABLE `employee` ADD FOREIGN KEY (`status_id`) REFERENCES `employee_status` (`id`);

ALTER TABLE `employee` ADD FOREIGN KEY (`employment_type_id`) REFERENCES `employment_type` (`id`);