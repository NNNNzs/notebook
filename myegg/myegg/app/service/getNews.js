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
    async init() {
        return await this.getInfo();
    }
}

module.exports = getNews;