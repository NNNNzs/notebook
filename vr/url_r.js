// 根据软件名爬取中关村产品链接
const fs = require('fs')
const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

const list = fs.readFileSync('./vr/soft.txt').toString('utf-8').split('\n').reverse()
async function getSoftUrl(softName) {
  try {
    const { data } = await axios({
      url: 'https://xiazai.zol.com.cn/search',
      params: {
        wd: softName,
        type: '1'
      }
    });
    const $ = cheerio.load(data);
    const href = $('.result-item .result-title a[href^="//xiazai"]').eq(0).attr('href');
    if (!href) {
      return null;
    }
    return href;
  } catch (error) {
    return null;
  }
}

async function getDownUrl(url, st) {
  if (!url) {
    const str = `${st}|暂无\n`
    fs.appendFileSync('./vr_url.txt', str);
    return false;
  }
  url = url.startsWith('//') ? 'https:' + url : url;
  let { data } = await axios({
    url: url,
    responseType: 'arraybuffer',
  });

  data = iconv.decode(Buffer.from(data), 'gbk');
  data = iconv.encode(data, 'utf8').toString();

  const $ = cheerio.load(data, {
    ignoreWhitespace: true,
    decodeEntities: false,
  });
  const softName = $('h1').text();

  const softId = url.split('/').pop().match(/[0-9]/g).join('');

  let scriptStr = $('head script[type="text/javascript"]:last').html();

  let downUrl = scriptStr.split('\n').filter(e => e.includes('downUrl'))[0].replace("var downUrl = '", '').replace("'; ", "").trim()
  console.log('downUrl', downUrl)

  const res = await axios({
    // headers: {
    //   referer: url,
    //   'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36'
    // },
    url: `http://installer.zol.com.cn/corp/client/setup_api.php?softid=${softId}`,
  });
  console.log('realUrlGetOk')

  // const realUrl = res.request.connection._httpMessage.res.responseUrl;
  const realUrl = res.data.data.downurl
  console.log('realUrl', realUrl)
  const str = `${st}|${softName}|${url}|${softId}|${realUrl}\n`
  console.log(str)
  fs.appendFileSync('./vr_url_r.txt', str)
}

async function init(softName) {
  const url = await getSoftUrl(softName);
  await getDownUrl(url, softName)
}

async function start() {
  for (let i = 0; i < list.length; i++) {
    const softName = list[i];
    await init(softName)
  }
}

start()