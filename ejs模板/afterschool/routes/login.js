var express = require('express');
var router = express.Router();
var { login,
  isUserNameRepeat,
  register } = require('../control/login')


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/login', (req, res, next) => {
  let { username, password } = req.body
  let msg = login(username, password)
  if (msg.code === 200) {
    req.session.name = username;
    // res.redirect('/')
    res.send(msg)
  } else if (msg.code === 404) {
    //用户不存在
    // res.render('index', { username: null });
    res.send(msg)
  } else {
    //密码错误
    res.send(msg)
  }
});
router.post('/isRepeat', (req, res, next) => {
  let { username, password } = req.body
  let msg = isUserNameRepeat(username, password);
  if(msg){
    res.send({code:401,msg:'用户已存在'})
  }else{
    res.send({code:200,msg:'OK'})
  }
});
router.post('/register', (req, res, next) => {
  let { username, password } = req.body;
  let msg = register(username, password)
  console.log(msg);
  res.send(msg)
})
router.post('/logout',(req,res,next)=>{
  req.session.name = undefined;
  if(!req.session.name){
    res.send({status:200,msg:'ok'})
  }else{
    res.send({status:400,msg:'fail'})
  }
})

module.exports = router;
