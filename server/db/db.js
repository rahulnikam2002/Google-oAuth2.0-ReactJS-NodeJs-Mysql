const mysql = require("mysql")

const db = mysql.createPool({
    connectionLimit: 520,
    host: "localhost",
    user: "root",
    password: "",
    database: "react_oauth2"
});

module.exports = db;