var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var User = require('../db').User;

/* Get a user */
const getUser = async obj => {
    return await User.findOne({
        where: obj
    });
};

// router.post('/user/login', function (req, res, next) {
//     passport.authenticate('local', { session: false }, (err, user, info) => {
//         console.log(err);
//         if (err || !user) {
//             return res.status(400).json({
//                 message: info ? info.message : 'Login failed',
//                 user: user
//             });
//         }
//         req.login(user, { session: false }, (err) => {
//             if (err) {
//                 res.send(err);
//             }

//             const token = jwt.sign(user, '1612175');
//             return res.json({ user, token });
//         });
//     })(req, res);
// });

router.post('/user/login', function (req, res, next) {
    const { email, password } = req.body;
    if (email && password) {
        var user = getUser({ email });
        if (!user) {
            res.status(401).json({ msg: 'No user found', user });
        }
        if (user.password === password) {
            var payload = { id: user.email };
            var token = jwt.sign(payload, '1612175');
            res.json({ user, token });
        } else {
            res.status(401).json({ msg: 'Wrong password' });
        }
    }
});

module.exports = router;