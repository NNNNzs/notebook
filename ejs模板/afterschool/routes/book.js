const express = require('express');
const router = express.Router();
const {mysql} = require('../tools/index');
let tables = mysql.readDB('product')
let works = tables.works
/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('book', { username: req.session.name});
});
router.get('/detail', function (req, res, next) {
  res.render('bookdetail', { username: req.session.name});
});

module.exports = router;