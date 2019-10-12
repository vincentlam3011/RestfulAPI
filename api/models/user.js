var db = require('../db');

(async function getUsers() {
    const res = await db.query('SELECT email, password FROM users_dbs');
    console.log(res);
}());