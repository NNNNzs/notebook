// 根据软件名爬取中关村产品链接
const fs = require('fs')
const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const list = require('./xml.json').urlset.url


async function init() {
  // console.log(list)
  list.forEach(async (ele,index) => {
    const { name } = ele.data.display;
    const sfdown = ele.data.display.tab['-sfdownurl'];
    if (!sfdown) {
      fs.appendFileSync('./1.txt', `${name}|暂无\n`)
      return false;
    }
    const isPay = sfdown.match('flag=0');
    if (isPay && sfdown) {
      console.log(index,name);
      const realUrl = await getRealUrl(sfdown);
      if(!realUrl){
        fs.appendFileSync('./1.txt', `${name}|超时\n`)
      }
      const str = `${name}|${sfdown}|${realUrl}\n`
      fs.appendFileSync('./1.txt', str)
    }
  })
}

async function getRealUrl(url) {
  // url: 'https://softdown.zol.com.cn/index.php?c=Down&softid=96079&pos=suote_jingzhun&flag=0&type=jingzhun',
  try {
    const { request } = await axios({
      url: url,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36',
        'Referer': 'https://softdown.zol.com.cn/detail/23/483985.shtml'
      },
    })
    return request.socket._httpMessage.res.responseUrl

  } catch (error) {
    // console.log(url)
    return null;
  }

  // .then(res => {
  //   console.log(res.request.socket._httpMessage.res.responseUrl);
  // })
}

init()
// getRealUrl()