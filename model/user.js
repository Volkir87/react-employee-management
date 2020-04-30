const connection = require('../config/db-connection');

class User {
    constructor(){
        this.connection = connection;
    };

    async getById(id){
        let query = `select user_id, first_name, last_name, status_id, created_date
        from user
        where id = ?;`;
        try {
			let result = await this.connection.query(query, [id]);
			return result;
		}
		catch(error){
			throw error;
		}
    };

    async create(){

    };

    async getAllDetailsById(id){
        let query = `select *
        from user
        where id = ?;`;
        try {
			let result = await this.connection.query(query, [id]);
			return result;
		}
		catch(error){
			throw error;
		}
    };

}

module.exports = User;