// MySQL connection 
const mysql = require("mysql2/promise");

let connection;
if (process.env.RDS_HOSTNAME) {
	connection = mysql.createPool({
		host: process.env.RDS_HOSTNAME,
		port: process.env.RDS_PORT,
		user: process.env.RDS_USERNAME,
		password: process.env.RDS_PASSWORD,
		database: process.env.RDS_DB_NAME,
		connectionLimit: 100
	});
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