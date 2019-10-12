var Sequelize = require('sequelize');
var UserModel = require('./models/user');

const sequelize = new Sequelize('myDB','root','30111998', {
    host: 'localhost',
    dialect: 'mysql',
});

const User = UserModel(sequelize, Sequelize);

sequelize.sync().then(()=>{
    console.log('DB and tables have been created!');
});

module.exports = User;