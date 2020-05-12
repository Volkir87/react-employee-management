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
        let query = `select u.user_id, u.first_name, u.last_name, ut.status, u.created_date, u.created_by
        from user u
        left outer join user_status ut on u.status_id = ut.id;`;
        try {
			let result = await this.connection.query(query);
			return result;
		}
		catch(error){
			throw error;
		}
    };

    async getUserRole(){
        let query = `select u.user_id, 
        case when r.name is NULL then 'No role' 
        else r.name end role_name, 
        case when r.description is NULL then 'No role' 
        else r.description end role_description,
        case when ur.assigned_date is NULL then 'N/A' 
        else ur.assigned_date end assigned_date,
        case when ur.assigned_by is NULL then 'N/A' 
        else ur.assigned_by end assigned_by
        from user u
        left outer join user_role ur on ur.user_id = u.id
        left outer join role r on ur.role_id = r.id;`;
        try {
			let result = await this.connection.query(query);
			return result;
		}
		catch(error){
			throw error;
		}
    };

    async getOneUserRole(userId, roleId){
        let query = `select u.user_id, 
        case when r.name is NULL then 'No role' 
        else r.name end role_name, 
        case when r.description is NULL then 'No role' 
        else r.description end role_description,
        case when ur.assigned_date is NULL then 'N/A' 
        else ur.assigned_date end assigned_date,
        case when ur.assigned_by is NULL then 'N/A' 
        else ur.assigned_by end assigned_by
        from user u
        left outer join user_role ur on ur.user_id = u.id
        left outer join role r on ur.role_id = r.id
        where u.id = ? and r.id = ?;`;
        try {
			let result = await this.connection.query(query, [userId, roleId]);
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
			return 1;
		}
		catch(error){
			throw error;
		}
    };

    async hasRole(userId, roleId){
        let query = `select *
        from user_role 
        where user_id = ? and role_id = ?;`;
        try {
            let result = await this.connection.query(query, [userId, roleId]);
            if (result[0].length > 0) {
                return true;
            } else {
                return false;
            }
		}
		catch(error){
            //console.log(error);
			throw error;
		}
    }

    async assignRole(userId, roleId, creator){
        let query = `insert into user_role (user_id, role_id, assigned_by) values 
        (?, ?, ?);`;
        try {
			await this.connection.query(query, [userId, roleId, creator]);
			return 1;
		}
		catch(error){
            console.log(error);
			throw error;
		}
    };

    async getAllDetailsByUserId(userId){
        let query = `select u.user_id, u.first_name, u.last_name, ut.status, u.created_date, u.created_by
        from user u
        left outer join user_status ut on u.status_id = ut.id
        where u.user_id = ?;`;
        try {
			let result = await this.connection.query(query, [userId]);
			return result;
		}
		catch(error){
			throw error;
		}
    };

    async getAuthUserByUserId(userId){
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
    };

    async getUserList(){
        let query = `select id, user_id
        from user
        where status_id = 1;`;
        try {
			let result = await this.connection.query(query);
			return result;
		}
		catch(error){
			throw error;
		}
    };

    async getRoleList(){
        let query = `select id, name
        from role;`;
        try {
			let result = await this.connection.query(query);
			return result;
		}
		catch(error){
			throw error;
		}
    };

}

module.exports = User;