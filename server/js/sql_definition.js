const mysql = require("mysql");
// requiers

function getConnection() {
    let con =
        mysql.createConnection({
            host: "localhost",
            user: "user",
            password: "",
            database: "u380338396_itb"
        });
    return con;
}

module.exports.connect = getConnection;