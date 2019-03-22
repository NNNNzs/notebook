var express = require('express');
var router = express.Router();
var { login,
  isUserNameRepeat,
  register } = require('../control/login')


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/', (req, res, next) => {
  let { username, password } = req.body
  let msg = login(username, password)
  if (msg.code === 200) {
    req.session.name = username;
    res.render('index', { username: req.session.name });
  } else if (msg.code === 404) {
    //用户不存在
    res.render('index', { username:null });
  } else {
    //密码错误
    res.send(msg)
  }
})

module.exports = router;
