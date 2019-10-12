var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');

/* POST login */
router.post('./user/login', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }

            const token = jwt.sign(user, '1612175');
            return res.json({user, token});
        });
    }) (req, res);
});

module.exports = router;