use rems_db;

insert into `user_status` (status, description) values
('Active', 'Active user'),
('Disabled', 'Disabled user');

insert into `user` (`user_id`, `first_name`, `last_name`, `password`, 
`status_id`, `created_by`) values 
('admin', 'Admin', '', '$2a$10$kbMqoEkNJPQBZ2o4Vyv/GeseyHwlHdj/KXuAGw50K07f90jgfnZau', 1, 'system');

insert into `role` (`name`, `description`, `created_by`) values 
('Admin', 'Provides administrative access', 'system'),
('HR', 'Provides regular HR user access', 'system'),
('HR Manager', 'Provides HR manager access', 'system');

insert into `user_role` (`user_id`, `role_id`, `assigned_by`) values 
(1, 1, 'system');

insert into department (name) values 
('Management'),
('Operations'),
('Sales'),
('Information Technologies');

insert into position (title, department_id, created_by) values 
('Director', 1, 'system'),
('Operations Manager', 2, 'system'),
('Operator', 2, 'system'),
('Sales Manager', 3, 'system'),
('Salesperson', 3, 'system'),
('Developer', 4, 'system'),
('Business Analyst', 4, 'system');

insert into employee (first_name, last_name, position_id, manager_id, created_by) values 
('John', 'Johnson', 1, null, 'system'),
('Fred', 'Fredson', 2, 1, 'system'),
('Richard', 'Richardson', 4, 1, 'system'),
('Dominico', 'Dolce', 3, 2, 'system'),
('Stefano', 'Gabbana', 3, 2, 'system'),
('Calvin', 'Klein', 5, 3, 'system');
