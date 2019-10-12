var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var User = require('../db');

router.post('/user/register', function (req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log(err);
        }
        else {
            req.login(user, (err) => {
                const data = {
                    email: req.body.email,
                    password: req.body.password,
                };
                User.findOne({
                    where: {
                        email: data.email,
                    },
                }).then(user => {
                    user
                        .update({
                            email: data.email,
                        }).then(() => {
                            console.log('User created in db');
                            return res.status(200).send({ message: 'User created' });
                        })
                })
            })
        }
    })(req, res, next)
})

router.post('/user/login', function (req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log(err);
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user: user
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }

            const token = jwt.sign(user, '1612175');
            return res.json({ user, token });
        });
    })(req, res);
});

module.exports = router;