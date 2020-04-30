// MySQL connection 
const mysql = require("mysql2/promise");

let connection;
if (process.env.JAWSDB_URL) {
	connection = mysql.createPool(process.env.JAWSDB_URL);
} else {      
	connection = mysql.createPool({
		host: "localhost",
		port: 3306,
		user: "root",
		password: "12345",
		database: "rems_db",
		connectionLimit: 100
	});
}

module.exports = connection;