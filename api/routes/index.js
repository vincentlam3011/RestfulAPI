var express = require('express');
var router = express.Router();
var User = require('../db').User;

/* Create a user */
const createUser = async ({ email, password }) => {
  return await User.create({ email, password });
};

/* Get a list of all users */
const usersList = async() => {
  return await User.findAll();
};

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });

/* GET all users */
router.get('/', function (req, res) {
  usersList().then(user => res.json(user));
});

/* POST register */
router.post('/user/register', function (req, res, next) {
  const { email, password } = req.body;
  createUser({ email, password }).then(user => res.json({
    user, msg: 'Account has been registered!'
  })
  );
})

module.exports = router;
