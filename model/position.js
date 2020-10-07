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

    async exists(deptId, positionName){
        let query = `select * from position where department_id = ? and title = ?;`
        try {
			let result = await this.connection.query(query, [deptId, positionName]);
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

    async getAllDetailsByPositionName(positionName, deptId){
        let query = `select p.title, d.name as 'department_name', date_format(p.created_date, '%Y-%m-%d') as 'created_date', p.created_by
        from position p
        left join department d on p.department_id = d.id 
        where title = ? and department_id = ?;`
        try {
			let result = await this.connection.query(query, [positionName, deptId]);
            return result;
		}
		catch(error){
			throw error;
		}
    };
    
    async create(positionName, deptId, createdBy){
        let query = 'insert into `position` (title, department_id, created_by) values (?, ?, ?);'
        try {
			await this.connection.query(query, [positionName, deptId, createdBy]);
            return 1;
		}
		catch(error){
			throw error;
		}
    };
}

module.exports = Position;