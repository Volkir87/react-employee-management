use ebdb;

ALTER TABLE `employee` ADD COLUMN (`status_id` int, `employment_type_id` int);

ALTER TABLE `employee` ADD FOREIGN KEY (`status_id`) REFERENCES `employee_status` (`id`);

ALTER TABLE `employee` ADD FOREIGN KEY (`employment_type_id`) REFERENCES `employment_type` (`id`);