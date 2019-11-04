const Sqlize = require('sequelize');
const UserModel = require('./models/user');

// const sqlize = new Sqlize({
//     database: 'mydb',
//     username: 'root',
//     password: '30111998',
//     dialect: 'mysql'
// });

const sqlize = new Sqlize({
    username: 'PitUo9ZDJo',
    password: 'L84E6CUqJd',
    database: 'PitUo9ZDJo',
    port: '3306',
    host: 'remotemysql.com',
    dialect: 'mysql',
})

sqlize
    .authenticate()
    .then(() => console.log("Connection has been established successfully!"))
    .catch(err => console.error("Unable to connect to database!", err));

const User = UserModel(sqlize, Sqlize);

sqlize.sync({ force: false }).then(() => console.log('DB synced!'));

module.exports = { User };