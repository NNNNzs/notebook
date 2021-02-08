// 百度搜索的结果
const fs = require('fs')
const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const UA = 'Mozilla / 5.0(Macintosh; Intel Mac OS X 11_2_0) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 88.0.4324.96 Safari / 537.36'


async function getSoftUrl(softName) {
  const { data } = await axios({
    url: 'https://www.baidu.com/s',
    headers: {
      'User-Agent': UA
    },
    params: {
      wd: softName,
      pn: 0,
      rn: 50,
      tn: 'json'
    }
  });
  const list = data.feed.entry;
  return list;
}

async function getDownUrl(url, st) {
  if (!url) {
    const str = `${st}|暂无\n`
    fs.appendFileSync('./vr_url.txt', str);
    return false;
  }
}

async function init(softName = 'chrome浏览器') {
  const list = await getSoftUrl(softName);
  let res = list.forEach(async ele => {
    const { title, url, abs } = ele;

    if (!url) {
      fs.appendFileSync('./temp/seo.txt', `${softName}|${title}|暂无`)
      return false
    }
    const { keyword = '', description = '' } = await getKeywordFromUrl(url)
    const str = `${softName}|${title}|${url}|${keyword}|${description}\n`;
    fs.appendFileSync('./temp/seo.txt', str)
  })
  // await getDownUrl(url, softName)
}
async function getKeywordFromUrl(url) {
  console.log(url)
  let { data } = await axios({
    url,
    responseType: 'arraybuffer',
  });
  
  data = iconv.decode(Buffer.from(data), 'gbk');
  data = iconv.encode(data, 'utf8').toString();

  const $ = cheerio.load(data);
  const keyword = $('meta[name="keyword"]').attr('content')
  const description = $('meta[name="description"]').attr('content');
  return {
    keyword,
    description
  }
}

// async function start() {
//   for (let i = 0; i < list.length; i++) {
//     const softName = list[i];
//     await init(softName)
//   }
// }

init()