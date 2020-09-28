/*
Employee.js
Author: Kirill Volodkin
Created date: 2020-05-01

The script creates and supports Department class which is responsible for running user-related queries.
*/

const connection = require('../config/db-connection');

class Department {
    constructor(){
        this.connection = connection;
    };

    async getById(id){
        let query = `
               where id = ?;`;
        try {
			let result = await this.connection.query(query, [id]);
			return result;
		}
		catch(error){
			throw error;
		}
    };

    async getAll(){
        let query = `
        select name, date_format(created_date, '%Y-%m-%d') as 'created_date', created_by 
        from department;
        `;
        try {
			let result = await this.connection.query(query);
			return result;
		}
		catch(error){
			throw error;
		}
    };

    async exists(deptName){
        let query = `select * from department where name = ?;`
        try {
			let result = await this.connection.query(query, [deptName]);
            if (result[0].length > 0) {
                return true;
            } else {
                return false;
            };
		}
		catch(error){
			throw error;
		}
    };

    async getAllDetailsByDeptName(deptName){
        let query = `select name, created_date, created_by from department where name = ?;`
        try {
			let result = await this.connection.query(query, [deptName]);
            return result;
		}
		catch(error){
			throw error;
		}
    };
    
    async create(deptName, createdBy){
        let query = `insert into department(name, created_by) values (?, ?);`
        try {
			await this.connection.query(query, [deptName, createdBy]);
            return 1;
		}
		catch(error){
			throw error;
		}
    };
}

module.exports = Department;