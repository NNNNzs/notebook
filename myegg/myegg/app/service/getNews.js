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
            // 
            return [];
        }
        let result = json.data.result;
        if (result.stat == '1') {
            return result.data
        } else {
            return []
        }
    }
    async getInfoByUrl(data) {
        let {uniquekey, title, date, category, author_name, url, thumbnail_pic_s, thumbnail_pic_s02, thumbnail_pic_s03 } = data;
        let res = await this.ctx.curl(url, { dataType: 'text' });
        let html = res.data;
        let $ = cheerio.load(html, {
            ignoreWhitespace: true,
            decodeEntities: false,
        });
        let guide = $('p').first().text() || $('p').last().text() || '暂无介绍';
        let content = $('#content').html();
        return html;
    }
    async getRealHtml(url) {
        let res = await this.ctx.curl(url, { dataType: 'text' });
        let html = res.data;
        return html;
    }
    async setDataIntoMysql(data) {

    }
    async init() {
        return await this.getInfoByUrl();
    }
}

module.exports = getNews;