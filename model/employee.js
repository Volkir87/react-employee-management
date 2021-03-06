/*
Employee.js
Author: Kirill Volodkin
Created date: 2020-05-19

The script creates and supports Employee class which is responsible for running employee-related queries.
*/

const connection = require('../config/db-connection');

class Employee {
    constructor(){
        this.connection = connection;
    }

    async getEmployeeList(){
        let query = `select id, concat(first_name, ' ', last_name) as 'name' from employee;`;
        try {
            let result = await this.connection.query(query);
            return result;
        }
        catch(error){
            throw error;
        }
    }

    async getManagersList(){
        let query = `select distinct e1.manager_id as 'id', concat(e2.first_name, ' ', e2.last_name) as 'name'
            from employee e1
            join employee e2 on e1.manager_id = e2.id;`;
        try {
            let result = await this.connection.query(query);
            return result;
        }
        catch(error){
            throw error;
        }
    }

    async viewEmployees(){
        let query = 
            `select e1.first_name, e1.last_name, p.title, d.name, 
            case when e1.manager_id is not null then concat(e2.first_name, ' ', e2.last_name)
            else 'No manager' end as 'manager',
			date_format(e1.start_date,"%Y-%m-%d %T") as 'start_date'
            from employee e1
            left outer join employee e2 on e1.manager_id = e2.id
            left outer join position p on p.id = e1.position_id
			left outer join department d on p.department_id = d.id;`
        try {
            let result = await this.connection.query(query);
            return result;
        }
        catch(error){
            throw error;
        }
    };

    async viewEmployeesByManager(managerId){ // do I need this?
        let query = 
            `select e1.first_name as 'First Name', e1.last_name as 'Last Name', r.title as 'Title', d.name as 'Department', 
            case when e1.manager_id is not null then concat(e2.first_name, ' ', e2.last_name)
            else 'No manager' end  as 'Manager'
            from employee e1
            left outer join employee e2 on e1.manager_id = e2.id
            left outer join role r on e1.role_id = r.id
            left outer join department d on r.department_id = d.id
            where e1.manager_id = ?;`;
        try {
            let result = await this.connection.query(query, [managerId]);
            return result;
        }
        catch(error){
            throw error;
        }
    }

    async addEmployee(firstName, lastName, managerId, positionId, startDate) {
        let query = `insert into employee (first_name, last_name, manager_id, position_id, start_date) 
            values (?, ?, ?, ?, ?);`;
        try {
            await this.connection.query(query, [firstName, lastName, managerId, positionId, startDate]);
            return 1;
        }
        catch(error){
            throw error;
        }
    }

    async getEmployeeDetails(firstName, lastName, managerId, positionId){ 
        let query = 
            `select e1.first_name, e1.last_name, p.title, d.name, 
            case when e1.manager_id is not null then concat(e2.first_name, ' ', e2.last_name)
            else 'No manager' end as 'manager',
			date_format(e1.start_date,"%Y-%m-%d %T") as 'start_date'
            from employee e1
            left outer join employee e2 on e1.manager_id = e2.id
            left outer join position p on p.id = e1.position_id
            left outer join department d on p.department_id = d.id
            where e1.first_name = ? and e1.last_name = ? and e1.manager_id = ? and e1.position_id = ?;`;
        try {
            let result = await this.connection.query(query, [firstName, lastName, managerId, positionId]);
            return result;
        }
        catch(error){
            throw error;
        }
    }

    async deleteEmployee(id) {
        let query = `delete from employee where id = ?;`;
        try {
            await this.connection.query(query, [id]);
            return 1;
        }
        catch(error){
            throw error;
        }
    }
    
    async terminateEmployee(id, terminationDate) {
        let query = `update employee 
        set where id = ?;`;
        try {
            await this.connection.query(query, [id, terminationDate]);
            return 1;
        }
        catch(error){
            throw error;
        }
    }

    async updateEmployeeRole(id, roleId){
        let query = `update employee set role_id = ? where id = ?;`;
        try {
            await this.connection.query(query, [roleId, id]);
            return 1;
        }
        catch(error){
            throw error;
        }        
    }

    async updateEmployeeManager(id, managerId){
        let query = `update employee set manager_id = ? where id = ?`;
        try {
            await this.connection.query(query, [managerId, id]);
            return 1;
        }
        catch(error){
            throw error;
        }
    }
}

module.exports = Employee;