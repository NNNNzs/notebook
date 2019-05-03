const Service = require('egg').Service;
const cheerio = require('cheerio');

class getNews extends Service {
    async getNewsByApi(type = 'top') {
        //tpye can be 'keji' 'tiyu' 
        let baseURL = 'http://v.juhe.cn/toutiao/index?key=972d027f2c56b51d99dec043f49618d0&type=';
        const pageUrl = baseURL + type;
        const json = await this.ctx.curl(pageUrl,{ dataType: 'json' });
        const result = json.data.result;
        if(result.stat=='1'){
            return result.data
        }else{
            return []
        }
    }
    async getInfoByUrl(){
        const {stat,data} = await this.getNewsByApi();
    }
    async setDataIntoMysql(){

    }
    async find(uid) {
        // 假如 我们拿到用户 id 从数据库获取用户详细信息
        const all = await this.app.mysql.select('newslist', { where:{category:'科技'},limit: 10, });
        return all ;
      }
    async init(){

    }
}

module.exports = getNews;