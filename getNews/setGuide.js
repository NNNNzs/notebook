const http = require('http');
const mysql = require('mysql');
const cheerio = require('cheerio');
const sqlConfig = {
    'host': 'www.nnnnzs.cn',
    "user": "newslist",
    "password": "123456ni",
    "database": "newslist",
    "charset": 'UTF8_GENERAL_CI'
};
var itemOut = 1000 * 60 * 60 * 1;//延迟时间

//1.获取数据库里面describe值为空的ID和URL
let ID, URL, guide;
function selectNoGuideFromMysql() {
    let connection = mysql.createConnection(sqlConfig);
    let selectQuery = 'SELECT ID,url FROM newslist WHERE guide ="" ORDER BY ID DESC limit 1 ';
    connection.connect();
    connection.query(selectQuery, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            // if (!result) {
                URL = result[0].url;
                ID = result[0].ID;
            // }
        }
    });
    connection.end(function () {
        // 2. 根据URL获取页面描述(第一个P标签的内容)
        getGuideByID();
    });
}

function getGuideByID() {
    http.get(URL, function (res) {
        let html = ''; //这是源数据
        res.on('data', function (data) {
            html += data;
        });
        res.on('end', function () {
            var $ = cheerio.load(html)
            guide = $('p').first().text();
            if (!guide) {
                guide = $('p').last().text();
                if (!guide) {
                    guide = '|'; //纯图片页面占位字符
                }
            }
            //3.把获取到的内容存到数据库里
            setGuideIntoSql(ID, guide);
        });
    });
}

function setGuideIntoSql(ID, guide) {
    let connection = mysql.createConnection(sqlConfig);
    connection.connect();
    let insectQuery = 'UPDATE newslist SET guide = ? WHERE ID=?';
    let insectDate = [guide, ID]
    connection.query(insectQuery, insectDate, function (err, result) {
        if (err) {
            console.log(err.message);
        }
        if (result) {
            console.log('ID' + ID + '已经设置介绍')
        }
        connection.end()
    });
};

var setGuide = setInterval(function () {
    selectNoGuideFromMysql()
}, 500);
