const saveImg  = require('./SaveImg');
const baseUrl  = 'https://cn.bing.com'
const axios = require('axios')

/**
 * format=js json
 * idx = 当前页面，可能最大8个
 * n=100，最大数
 * nc=，时间戳
 * pid=hp，不清楚
 */


// https://cn.bing.com/HPImageArchive.aspx?format=js&idx=1&n=100&nc=1565919250503&pid=hp
class getBingImg extends saveImg{
    async getImgList(){
        let params = {
            format:'js',
            idx:'1',
            n:'100',
            nc:new Date().getTime(),
            pid:'hp'
        }
        let url = baseUrl + '/HPImageArchive.aspx'
        let res = await axios({
            url,
            params,
        })
        return res.data.images.map(e=>{
            return baseUrl + e.url;
        })
    }
    async saveImg(){
        const imgList = await this.getImgList()
        imgList.forEach(e=>{
            new saveImg(e,'./bing/')
        })
    }
    
}