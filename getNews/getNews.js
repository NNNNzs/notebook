const http = require('http');
const mysql = require('mysql');
const fs = require("fs");
const cheerio = require('cheerio');
const sqlConfig = require('./sql.json')
const baseURL = 'http://v.juhe.cn/toutiao/index?key=972d027f2c56b51d99dec043f49618d0&type=';


//1.根据聚合数据api爬取实时数据
function getNewsByApi(type, callback) {
    let pageUrl = baseURL + type;
    let str = `\n${new Date} 执行爬取操作\n`
    fs.appendFileSync("./log.txt", str)
    http.get(pageUrl, function (res) {
        let html = ''; //这是源数据
        res.on('data', function (data) {
            html += data;
        });
        res.on('end', function () {
            html = JSON.parse(html)
            callback(html)
            html = '';
        })
    });
}
//2.根据url获取介绍和真实数据
function getGuideByUrl(URL, callback) {
    http.get(URL, function (res) {
        let html = '';
        res.on('data', function (data) {
            html += data;
        });
        res.on('end', function () {
            let $ = cheerio.load(html, {
                ignoreWhitespace: true,
		decodeEntities: false,
            })
            guide = $('p').first().text() || $('p').last().text() || '暂无介绍';
            content = $('#content').html();
            callback(guide, content);
            html = '';
        })
    });
}
//3.把真实数据放进数据库
function setDateIntoMysql(html) {
    let dataList = html.result.data; //新闻数据列表
    for (index in dataList) {
        let thisData = dataList[index];
        //根据url获取描述和新闻内容后,一起存入数据库
        getGuideByUrl(thisData.url, function (guide, content) {
            let connection = mysql.createConnection(sqlConfig)
            connection.connect();
            thisData.guide = guide;
            thisData.content = content;
            let sqlQuery = 'INSERT INTO newslist(uniquekey,title,guide,date,category,author_name,content,url,thumbnail_pic_s,thumbnail_pic_s02,thumbnail_pic_s03,ins_time) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)';
            let data = [thisData.uniquekey, thisData.title, thisData.guide, thisData.date, thisData.category, thisData.author_name, thisData.content, thisData.url, thisData.thumbnail_pic_s, thisData.thumbnail_pic_s02, thisData.thumbnail_pic_s03, new Date()];
            connection.query(sqlQuery, data, function (error, results) {
                if (error) {
                    error = {
                        'errorcode': error.code,
                        'sqlMessage': error.sqlMessage
                    }
                    closeConnect(error)
                    connection.end();
                }
                if (results) {
                    closeConnect(results)
                    connection.end();
                }
            });
        });
    }
}

function closeConnect(json) {
    let str = JSON.stringify(json);
    fs.appendFileSync("./log.txt", str + '\n');
}



getNewsByApi('top', setDateIntoMysql);
getNewsByApi('keji',setDateIntoMysql);
getNewsByApi('tiyu',setDateIntoMysql);
setInterval(function () {
    getNewsByApi('top',setDateIntoMysql);
}, 3600000* 0.5) //每半小时

setInterval(function () {
    getNewsByApi('keji',setDateIntoMysql);
    getNewsByApi('tiyu',setDateIntoMysql);
}, 3600000* 2) //每两小时