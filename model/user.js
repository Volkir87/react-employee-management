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

    async getAll(){
        let query = `select user_id, first_name, last_name, status_id, created_date, created_by
        from user`;
        try {
			let result = await this.connection.query(query);
			return result;
		}
		catch(error){
			throw error;
		}
    };

    async create(userId, firstName, lastName, password, creator){
        let query = `insert into user (user_id, first_name, last_name, password, status_id, created_by)
        values (?, ?, ?, ?, 1, ?);`;
        try {
			await this.connection.query(query, [userId, firstName, lastName, password, creator]);
			return 1;
		}
		catch(error){
            console.log(error);
			throw error;
		}
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
            //console.log(result);
            if (result[0].length > 0) {
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