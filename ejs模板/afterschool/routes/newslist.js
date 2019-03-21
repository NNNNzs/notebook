const express = require('express');
const router = express.Router();
const {mysql} = require('../tools/index');
let tables = mysql.readDB('product')
let works = tables.works
/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('newslist', { works: works });
});

module.exports = router;