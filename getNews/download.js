/**
 * http://download.ink/?id=num
 */
const http = require('http');
const fs = require('fs')
const cheerio = require('cheerio');

function get(URL) {
    return new Promise(function (resolve) {
        http.get(URL, function (res) {
            let html = '';
            res.on('data', function (data) {
                html += data;
            });
            res.on('end', () => {
                let $ = cheerio.load(html)
                let hrefs = $('a[href^="magnet"]') || $('a[href^="ed2k"]') || $('a[href^="thunder"]')
                let href = [];
                search($('a[href^="magnet"]'))
                search($('a[href^="ed2k"]'))
                search($('a[href^="thunder"]'))
                function search(reg) {
                    for (i in reg) {
                        if (reg[i].attribs && reg[i].attribs.href)
                            href.push(reg[i].attribs.href)
                    }
                }
                let title = $('.post-title').text()
                resolve({
                    title: title,
                    href: href
                })
            });
        });
    })
}


for (let i = 1; i <= 1000; i++) {
    get('http://download.ink/?id='+i)
        .then((data) => {
            data.id=i;
            fs.appendFileSync("./log.json", JSON.stringify(data)+'\n')
            console.log(i)
        })
}