/*
Employee.js
Author: Kirill Volodkin
Created date: 2020-05-01

The script creates and supports Position class which is responsible for running user-related queries.
*/

const connection = require('../config/db-connection');

class Position {
    constructor(){
        this.connection = connection;
    };

    async getById(id){
        let query = `select * from position
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
        select p.title, d.name as 'department_name', date_format(p.created_date, '%Y-%m-%d') as 'created_date', p.created_by
        from position p
        left join department d on p.department_id = d.id;
        `;
        try {
			let result = await this.connection.query(query);
			return result;
		}
		catch(error){
            console.log(error);
			throw error;
		}
    };

    async exists(posName, deptName){
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

module.exports = Position;