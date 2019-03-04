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
    var inputFiles = req.files
    //读取文件内容
    let file = inputFiles['inputFile'][0]//实际文件
    let extname = path.extname(file.originalname);//后缀名
    var md5Name = crypto.createHash('md5').update(file.buffer, 'utf-8').digest('hex');//计算出上传文件的md5,当做文件名
    fs.writeFileSync(path.resolve(__dirname, '../public'+staticUrl+md5Name)+extname,file.buffer)
    res.redirect(staticUrl+md5Name+extname)

    // 下面的代码是在用multer默认上传路径时，重命名文件名，加后缀
    // fs.rename(file.path, file.path + extname, function (err) {
    //     if (err) {
    //         res.send('上传失败')
    //     } else {
    //         let imgUrl = staticUrl + file.filename + extname;//相对于服务器路径
    //         res.redirect(imgUrl)
    //     }
    // })
});
router.post('/login',)




router.get('/rel', function (req, res, next) {
    res.render('index', { title: db });
});


module.exports = router;
