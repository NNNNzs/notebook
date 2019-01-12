const cheerio = require('cheerio');
const axios = require('axios');
const baseUrl = 'https://www.3dmgame.com/games/cyberpunk2077/news_1/';
const http = require('http');
const https = require('https')
const url = require('url');
const fs = require('fs');
const path = require('path')
let Num = 0;

//首先根据页面抓到a标签和img标签

//1、抓取到页面的源码
function getContent(url) {
    let myURL = new URL(url);
    let myhttp = myURL.protocol == 'http' ? http : https;
    return new Promise(function (resolve, reject) {
        myhttp.get(url, (res) => {
            let html = ''; //这是源数据
            res.on('data', function (data) {
                html += data;
            });
            res.on('end', () => {
                resolve(html);
            }).on('error', err => {
                reject(err);
            })
        });
    })
};

//根据html源码抓取图片src列表和a标签href
function getSrcList(html) {
    // console.log(baseUrl)
    let $ = cheerio.load(html, {
        ignoreWhitespace: true,
        decodeEntities: false,
    });
    let imgList = [];
    for (let i = 0; i < $('img').length; i++) {
        let src = $('img').eq(i).attr('src');
        if (src) {
            //todo 根据有没有协议号判断 判断是相对路径还是绝对路径
            imgList.push($('img').eq(i).attr('src'));
        }
    };
    console.log(imgList)
}

getContent(baseUrl)
    .then(html => {
        getSrcList(html)
    })
    .catch(err => {
        console.log(err)
    })

//抓取图片的url，保存到本地

//demo
// var url = "http://s0.hao123img.com/res/img/logo/logonew.png";

function saveImg(imgUrl) {
    let myURL = new URL(imgUrl);
    let extname = path.extname(imgUrl);
    let myhttp = myURL.protocol == 'http:' ? http : https;
    myhttp.get(imgUrl, function (res) {
        var imgData = "";
        res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
        res.on("data", function (chunk) {
            imgData += chunk;
        });
        res.on("end", function () {
            fs.writeFile('./' + Num + extname, imgData, "binary", function (err) {
                if (err) {
                    console.log("down fail");
                } else {
                    console.log("down success");
                    Num++
                }
            });
        });
    });
}