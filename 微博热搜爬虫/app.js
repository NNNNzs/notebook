//http://es6.ruanyifeng.com/#docs/async
const http = require('https');
const url = 'https://s.weibo.com/top/summary';
const cheerio = require('cheerio')

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

// getHot(url).then((html) => {
//     let $ = cheerio.load(html, {
//         ignoreWhitespace: true,
//         decodeEntities: false,
//     });
//     let list = $('#pl_top_realtimehot tbody>tr');
//     let l = list.length; //一般头条加50共51条
//     let resulte = [];
//     for (let i = 1; i < l; i++) {
//         let rank = list.eq(i).find('.td-01.ranktop').text();
//         let title = list.eq(i).find('.td-02 a').text();
//         let link_html = list.eq(i).find('.td-02 a').html();
//         let num = list.eq(i).find('.td-02 span').text();
//         let tip = list.eq(i).find('.td-03').text();
//         resulte.push({
//             rank: rank,
//             title: title,
//             link_html: link_html,
//             num: num,
//             tip: tip || null
//         })
//     }
//     console.log(resulte)
// });

function formatDate(html) {
    return new Promise((resolve, reject) => {
        let $ = cheerio.load(html, {
            ignoreWhitespace: true,
            decodeEntities: false,
        });
        let list = $('#pl_top_realtimehot tbody>tr');
        let l = list.length; //一般头条加50共51条
        let resulte = [];
        for (let i = 1; i < l; i++) {
            let rank = list.eq(i).find('.td-01.ranktop').text();
            let title = list.eq(i).find('.td-02 a').text();
            let link_html = list.eq(i).find('.td-02 a').html();
            let num = list.eq(i).find('.td-02 span').text();
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

const asyncReadFile = async function () {
    const html = await getHot(url)
    const f2 = await formatDate(html);
    return f2;
};
asyncReadFile();