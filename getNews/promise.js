const fs = require('fs');
const http = require('http');
const cheerio = require('cheerio')
const sqlConfig = {
    'host': 'www.nnnnzs.cn',
    "user": "newslist",
    "password": "123456ni",
    "database": "newslist",
    "charset": 'UTF8_GENERAL_CI'
};
let url = 'http://mini.eastday.com/mobile/180926095835788.html'

function getGeideByUrl(URL) {
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
            };
        });
    });
}
pageUrl = url;
new Promise(function (resolve) {
    //根据API获取信息
    http.get(pageUrl, function (res) {
        var html = ''; //这是源数据
        res.on('data', function (data) {
            html += data;
        });
        res.on('end', function () {
            html = JSON.parse(html)
            resolve(html)
        });
    });
}).then(html => {
    //根据url获取描述
    let connection = mysql.createConnection(sqlConfig);
    connection.connect();
    let dataList = html.result.data; //新闻数据列表
    return new Promise(function (resolve) {
        let guide
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
                };
                resolve(guide)
            });
        });
    })
}).then(guide => {
    thisData.guide = guide;
    let sqlQuery = 'INSERT INTO newslist(uniquekey,title,guide,date,category,author_name,url,thumbnail_pic_s,thumbnail_pic_s02,thumbnail_pic_s03,ins_time) VALUES(?,?,?,?,?,?,?,?,?,?,?)';
    let data = [thisData.uniquekey, thisData.title, thisData.guide, thisData.date, thisData.category, thisData.author_name, thisData.url, thisData.thumbnail_pic_s, thisData.thumbnail_pic_s02, thisData.thumbnail_pic_s03, new Date()];
    connection.query(sqlQuery, data, function (error, results, fields) {
        if (error) {
            console.log(error)
            repeatNews++
        }
        if (results) {
            validNews++
        }
    });
})