const axios = require('axios')
const fs = require('fs');
const crypto = require('crypto');

/**
 * 根据网络url,获取图片，并保存到本地
 */
class saveImg {
    constructor(imgUrl, savePath = "./img/") {
        this.imgUrl = imgUrl;
        this.savePath = savePath
        this.init()
    }
    async init () {
        let imgBinary = await this.getImgByUrl(this.imgUrl);
        this.saveImgByBinary(imgBinary)
    }
    async getImgByUrl (imgUrl) {
        let img = await axios({
            url: imgUrl,
            method: 'get',
            responseType: 'arraybuffer'
        })
        return Buffer.from(img.data, 'binary')
    }
    saveImgByBinary (img) {
        let savePath = this.savePath
        let md5Name = crypto.createHash('md5').update(img, 'utf-8').digest('hex');//计算出上传文件的md5,当做文件名
        //目录不存在创建
        if (!fs.existsSync(savePath)) {
            fs.mkdirSync(savePath)
        }
        //写文件
        fs.writeFile(`${savePath}${md5Name}.png`, img, 'binary', function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log(`加载成功`);
            }
        });
    }
}
module.exports = saveImg