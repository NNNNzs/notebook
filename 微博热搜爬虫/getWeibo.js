const http = require('https');
const url = 'https://s.weibo.com/top/summary';
const cheerio = require('cheerio');
const mysql = require('mysql');
const sqlConfig = {
    host: 'api.nnnnzs.cn',
    user: 'newslist',
    password: '123456ni',
    database: 'newslist'
};
function getHot(url) {
    return new Promise(function (resolve, reject) {
        http.get(url, (res) => {
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

function formatData(html) {
    return new Promise((resolve, reject) => {
        let $ = cheerio.load(html, {
            ignoreWhitespace: true,
            decodeEntities: false,
        });
        let list = $('#pl_top_realtimehot tbody>tr');
        let l = list.length; //一般头条加50共51条
        let resulte = [];
        for (let i = 0; i < l; i++) {
            let rank = Number(list.eq(i).find('.td-01.ranktop').text())||'top';
            let title = list.eq(i).find('.td-02 a').text();
            let link_html = list.eq(i).find('.td-02 a').html();
            let num = Number(list.eq(i).find('.td-02 span').text());
            let tip = list.eq(i).find('.td-03').text();
            resulte.push({
                rank: rank,
                title: title,
                link_html: link_html,
                num: num,
                tip: tip || null
            })
        }
        resolve(resulte)
    })
}
function setArrToDB(arr){
    let t = new Date();
    return new Promise((resolve,reject)=>{
        arr.forEach((ele,index,arr)=>{
            let connection = mysql.createConnection(sqlConfig)
            connection.connect();
            let sqlQuery = 'INSERT INTO w_top(time,rank,title,link_html,num,tip) VALUES(?,?,?,?,?,?)';
            let data = [t,ele.rank,ele.title,ele.link_html,ele.num,ele.tip];
            connection.query(sqlQuery, data, function (error, results) {
                if (error) {
                    connection.end();
                    reject(error);
                }
                if (results) {
                    connection.end();
                    resolve(results)
                }
            });
        })
    })
}

const asyncReadFile = async function () {
    const html = await getHot(url)
    const arr = await formatData(html);//[{rank:49,title:'标题',link_html:'arr',num:555,tip:'新'},{}]
    const resulte = await setArrToDB(arr);
    console.log(resulte)
};
asyncReadFile();
setInterval(()=>{asyncReadFile()},1000*60*10)//十分钟