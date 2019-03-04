const axios = require('axios');
const cheerio = require('cheerio')
const http = require('http')

function getGuideByUrl(data) {
    data = 'http://search.onlinedown.net/search_list.php?searchsid=1&searchname=' + data
    http.get(data, function (res) {
        let html = '';
        res.on('data', function (data) {
            html += data;
        });
        res.on('end', function () {
            let $ = cheerio.load(html, {
                ignoreWhitespace: true,
                decodeEntities: false,
            })
            // console.log(html)
            // guide = $('p').first().text() || $('p').last().text() || '暂无介绍';
            let title = $('.listCont').length
            console.log(title)
        })
    });
}

getGuideByUrl('tengxushiping')