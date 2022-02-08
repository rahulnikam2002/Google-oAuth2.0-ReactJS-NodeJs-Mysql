//importing mysql package so the we can add our database credentials
const mysql = require("mysql")

//Configuring credentials
const db = mysql.createPool({
    connectionLimit: 520,
    host: "localhost",
    user: "root",
    password: "",
    database: "react_oauth2"
});

//Exporting this file so that we can access this anywhere on our server by importing it.
module.exports = db;
