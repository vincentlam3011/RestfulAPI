module.exports = function (sqlize, DataTypes) {
    const User = sqlize.define('users', {
        email: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING
        },
        username: {
            type: DataTypes.STRING
        },
        avatarUrl: {
            type: DataTypes.STRING
        }
    })
    return User;
}