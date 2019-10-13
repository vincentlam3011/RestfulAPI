// var mysql = require('mysql');
// var util = require('util');

// const pool = mysql.createPool({
//     connectionLimit: 10,
//     host: 'localhost',
//     user: 'root',
//     password: '30111998',
//     database: 'myDB'
// });

// pool.getConnection((err, connection) => {
//     if (err) {
//         if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//             console.error('Database connection was closed.')
//         }
//         if (err.code === 'ER_CON_COUNT_ERROR') {
//             console.error('Database has too many connections.')
//         }
//         if (err.code === 'ECONNREFUSED') {
//             console.error('Database connection was refused.')
//         }
//     }

//     if (connection) connection.release()

//     return
// })

// pool.query = util.promisify(pool.query);
// module.exports = pool;

const Sqlize = require('sequelize');
const UserModel = require('./models/user');

const sqlize = new Sqlize({
    database: 'mydb',
    username: 'root',
    password: '30111998',
    dialect: 'mysql'
});

sqlize
    .authenticate()
    .then(() => console.log("Connection has been established successfully!"))
    .catch(err => console.error("Unable to connect to database!", err));

const User = UserModel(sqlize, Sqlize);

sqlize.sync({ force: false }).then(() => console.log('DB synced!'));

module.exports = { User };