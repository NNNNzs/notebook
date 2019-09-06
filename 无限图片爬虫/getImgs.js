
const https = require('https')
const http = require('http')
const fs = require('fs');
const path = require('path')
const axios = require('axios')


// saveImg('https://sariay.github.io/Random-img/4.jpg',1)

function getImgAxios (imgUrl, i) {
    axios({
        url: imgUrl,
        method: 'get',
        responseType: 'arraybuffer'
    }).then(res => {
        img = Buffer.from(res.data, 'binary')
        fs.writeFile(`./img/${i}.jpg`, img, 'binary', function (err) {
            if (err) {
                console.error(`${i}加载失败`);
            } else {
                console.log(`${i}加载成功`);
            }
        });

    }).catch(err => {
        console.error(err)
    })
}

let s = [35, 40, 44, 49, 64, 69, 73]
s.map(i => {
    let imgUrl = `https://sariay.github.io/Random-img/${i}.jpg`
    getImgAxios(imgUrl, i)
})
// for (let i = 0; i < 112; i++) {
//     let imgUrl = `https://sariay.github.io/Random-img/${i}.jpg`
//     getImgAxios(imgUrl, i)
// }

function saveImg (imgUrl, i) {
    let extname = path.extname(imgUrl);
    https.get(imgUrl, function (res) {
        var imgData = "";
        res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
        res.on("data", function (chunk) {
            imgData += chunk;
            console.log(`${i}加载中`)
        });
        res.on("end", function () {
            fs.writeFile('./img/' + i + extname, imgData, "binary", function (err) {
                if (err) {
                    console.error(`${i}加载失败`);
                    // console.log("down fail");
                } else {
                    // console.log("down success");
                    console.log(`${i}加载成功`);
                }
            });
        });
    });
}