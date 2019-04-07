var express = require('express');
var router = express.Router();
var { mysql } = require('../tools/index.js')
var fs = require('fs')
var multer = require('multer');
var staticUrl = '/uploads/';//上传文件的路径
// var upload = multer({ dest: './public' + staticUrl });//直接存储到默认文件夹，无需手动fs，
var upload = multer();//有buffer类
var path = require('path');
var crypto = require('crypto');
//从upload中获取文件

/* GET home page. */
router.get('/', function (req, res, next) {
    let db = mysql.readDB()
    db = JSON.stringify(db)
    res.render('index', { title: db });
});

router.post('/rel', upload.fields([{ name: 'inputFile', maxCount: 1 }]), function (req, res, next) {
    let inputFiles = req.files
    //读取文件内容
    let file = inputFiles['inputFile'][0]//实际文件
    let extname = path.extname(file.originalname);//后缀名
    let md5Name = crypto.createHash('md5').update(file.buffer, 'utf-8').digest('hex');//计算出上传文件的md5,当做文件名
    //将文件以md5+后缀的方式存进public的uploads文件夹里
    fs.writeFileSync(path.resolve(__dirname, '../public' + staticUrl + md5Name) + extname, file.buffer)
    res.send(staticUrl + md5Name + extname)
    // res.redirect(staticUrl+md5Name+extname)
});

router.get('/islogin', (req, res, next) => {
    if (req.session.name) {
        res.send('1')
    }
    else {
        res.send('0')
    }
});

//接收图片上传
router.post('/upload', (req, res, next) => {
    //接收到三个参数
    let { imgSrc, author, describe } = req.body;    
    //把参数存到数据库
    let productList = mysql.readDB('product');
    productList.works.push({ imgSrc, author, describe })
    mysql.updateDB('product',productList)
    res.send({status:200})    
});



module.exports = router;
