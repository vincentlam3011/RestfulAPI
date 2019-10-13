var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/* GET user's profile */
router.get('/me', function (req, res, next) {
  res.send(req.user);
});

module.exports = router;
