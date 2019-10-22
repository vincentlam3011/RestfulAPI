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