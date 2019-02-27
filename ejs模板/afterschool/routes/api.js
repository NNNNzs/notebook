var express = require('express');
var router = express.Router();
var {mysql} = require('../tools/index.js')

/* GET home page. */
router.get('/', function (req, res, next) {
    let db = mysql.readDB()
    db = JSON.stringify(db)
    res.render('index', { title: db });
});

module.exports = router;
