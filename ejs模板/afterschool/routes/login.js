var express = require('express');
var router = express.Router();
var {login} = require('../control/login');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/',(req,res,next)=>{
  let {username,password} = req.body
  let msg = login(username,password)
  res.send(msg)
})

module.exports = router;
