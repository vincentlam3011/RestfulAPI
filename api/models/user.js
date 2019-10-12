module.exports = (sequelize, type) => {
    return sequelize.define('users_DB', {
        email: {
            type: type.STRING,
            primaryKey: true,
            allowNull: false,
        },
        password: {
            type: type.STRING,
            allowNull: false,
        },
    })
};