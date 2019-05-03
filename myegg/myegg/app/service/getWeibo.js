const Service = require('egg').Service;
const cheerio = require('cheerio');

class getWeibo extends Service {
    async getHot() {
        const url = 'https://s.weibo.com/top/summary';
        let res = await this.ctx.curl(url, { dataType: 'text' });
        let html = res.data;
        let $ = cheerio.load(html, {
            ignoreWhitespace: true,
            decodeEntities: false,
        });
        let list = $('#pl_top_realtimehot tbody>tr');
        let l = list.length; //一般头条加50共51条
        let resulte = [];
        for (let i = 0; i < l; i++) {
            let rank = Number(list.eq(i).find('.td-01.ranktop').text()) || 'top';
            let title = list.eq(i).find('.td-02 a').text();
            let link_html = list.eq(i).find('.td-02 a').html();
            let num = Number(list.eq(i).find('.td-02 span').text());
            let tip = list.eq(i).find('.td-03').text();
            resulte.push({
                time: new Date(),
                rank: rank,
                title: title,
                link_html: link_html,
                num: num,
                tip: tip || null,

            })
        }
        // this.insertToDB(resulte[0]);
        resulte.forEach(e => {
            this.insertToDB(e);
        });
        return resulte;
    }
    async insertToDB(data) {
        const result = await this.app.mysql.insert('w_top', data);
    }
    async outputWeibo() {
        let query = this.ctx.query;
        if(query.title){
            let selectByTitle = `SELECT * FROM w_top WHERE title = '${query.title}' ORDER BY time; `;
            return await this.app.mysql.query(selectByTitle);
        }
        let sqlQuery = 'SELECT * FROM w_top WHERE time = (SELECT time FROM w_top ORDER BY id DESC LIMIT 1) ORDER BY rank;';
        let results = await this.app.mysql.query(sqlQuery);
        return results;
    }
    async init() {
        return await this.outputWeibo();
    }
}

module.exports = getWeibo;