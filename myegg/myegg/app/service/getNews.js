const Service = require('egg').Service;
const cheerio = require('cheerio');

class getNews extends Service {
    async getNewsByApi(type = 'top') {
        //tpye can be 'keji' 'tiyu' 
        let baseURL = 'http://v.juhe.cn/toutiao/index?key=972d027f2c56b51d99dec043f49618d0&type=';
        const pageUrl = baseURL + type;
        const json = await this.ctx.curl(pageUrl, { dataType: 'json' });
        //超过次数
        if (json.error_code === 10012) {
            // 超过访问次数
            return [];
        }
        let result = json.data.result;
        if (result.stat == '1') {
            return result.data
        } else {
            return []
        }
    }
    async getInfo() {
        let dataArr = [];
        dataArr = await this.getNewsByApi();

        //抓取内容和简介，拼接到原数组

        // 等待异步操作完成，返回执行结果
        let results = await Promise.all(dataArr.map(async (item) => {
            let date = new Date()
            //返回拼接的对象
            let data = Object.assign(item, await this.getInfoByUrl(item.url), { ins_time: date });
            this.setDataIntoMysql(data);
            return data
        }));

        return results;

    }
    async getInfoByUrl(url) {
        let res = await this.ctx.curl(url, { dataType: 'text' });
        let html = res.data;
        let $ = cheerio.load(html, {
            ignoreWhitespace: true,
            decodeEntities: false,
        });
        let guide = $('p').first().text() || $('p').last().text() || '暂无介绍';
        let content = $('#content').html();
        return { guide, content };
    }
    async getRealHtml(url) {
        let res = await this.ctx.curl(url, { dataType: 'text' });
        let html = res.data;
        return html;
    }
    async setDataIntoMysql(data) {
        const result = await this.app.mysql.insert('newslist', data);
        return result;
    } 
    async outputNews(){
        let {
            keywords = '', type = '头条', page = '1'
        } =  this.ctx.query;
        let sqlQuery ='';
        if (keywords) {
            sqlQuery = `SELECT * FROM newslist where title like '%${keywords}%' or guide like '%${keywords}%' ORDER BY date DESC limit ${(page - 1) * 30},30`;
        } else {
            sqlQuery = `SELECT ID,title,guide,date,category,author_name,url,thumbnail_pic_s,thumbnail_pic_s02,thumbnail_pic_s03,ins_time FROM newslist WHERE category='${type}' ORDER BY date DESC limit ${(page - 1) * 30},30`;
        }
        return await this.app.mysql.query(sqlQuery);
    }
    async init() {
        return await this.outputNews();
    }
}

module.exports = getNews;