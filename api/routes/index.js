var express = require('express');
var router = express.Router();
var User = require('../db').User;
var jwt = require('jsonwebtoken');

/* Create a user */
const createUser = async ({ email, password, username, }) => {
  return await User.create({ email, password, username, });
};

/* Get a list of all users */
const usersList = async () => {
  return await User.findAll();
};

/* Get a user */
const getUser = async obj => {
  return await User.findOne({
    where: obj
  });
};

/* GET all users */
router.get('/', function (req, res) {
  usersList().then(user => res.json(user));
});

/* POST register */
router.post('/user/register', function (req, res, next) {
  const { email, password, username } = req.body;
  createUser({ email, password, username, }).then(user => res.json({
    user, msg: 'Account has been registered!'
  })
  );
})

/* POST login */
router.post('/user/login', async function (req, res, next) {
  const { email, password } = req.body;
  if (email && password) {
    var user = await getUser({ email });
    if (!user) {
      res.status(401).json({ msg: 'No user found', user });
    }
    if (user.password === password) {
      var payload = { email: user.email, password: user.password, username: user.username, avatar: user.avatarUrl };
      var token = jwt.sign({ user: payload }, '1612175');
      return res.json({ user, token });
    } else {
      res.status(401).json({ msg: 'Wrong password' });
    }
  } else {
    res.status(401).json({ msg: 'No email or password' });
  }
});

/* PUT edit */
router.put('/user/edit', async function (req, res, next) {
  const { email, username, password, avatarUrl, token } = req.body;
  console.log(req.body);
  var user = await getUser({ email });
  // return res.json(user);
  var newData = { email: email, username: username, password: password, avatarUrl: avatarUrl };
  user.update(newData).then((user) => { 
    var payload = user;
    var token = jwt.sign( { user: payload }, '1612175');
    return res.json({ user, token}) ;
  })
  // User.update(newData, { where: { email: req.body.email } }).then(updated => {
  //   var newUser = User.findOne({ where: { email: req.body.email } });
  //   return res.json(
  //     {
  //       updated,
  //       newUser,
  //       msg: 'Data updated',
  //       token,
  //     }
  //   )
  // }
  // )
  // console.log(JSON.stringify(user));
  // var newUser = await getUser({ email });
  // return res.json({ newUser, token });
})
module.exports = router;
