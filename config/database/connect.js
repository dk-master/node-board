const mysql = require('mysql');
const config = require('./config');

const pool = mysql.createPool({
    user : config.user,
    password : config.password,
    host : config.host,
    database : config.database,
    multipleStatements : true,
    connectionLimit : 20  
})
function getConnection(cb){
    pool.getConnection((err,conn) => {
        cb(err,conn);
    });

}

module.exports = getConnection;