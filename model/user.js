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

    async updatePwd(userId, password){
        let query = `update user
        set password = ?
        where user_id = ?;`;
        try {
			await this.connection.query(query, [password, userId]);
			return true;
		}
		catch(error){
			throw error;
		}
    }

    async getAllDetailsByUserId(userId){
        let query = `select *
        from user
        where user_id = ?;`;
        try {
			let result = await this.connection.query(query, [userId]);
			return result;
		}
		catch(error){
			throw error;
		}
    };

    async exists(userId){
        let query = `select *
        from user
        where user_id = ?;`;
        try {
            let result = await this.connection.query(query, [userId]);
            console.log(result);
            if (result.length > 0) {
                return true;
            } else {
                return false;
            }
		}
		catch(error){
			throw error;
		}
    }

}

module.exports = User;