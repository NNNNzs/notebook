const axios = require('axios');
const keywordStr = require('./keyword')
// const keywordList = keywordStr.split('\n');
const fs = require('fs')
let keywordList = `360软件管家
360管家
360电脑管家
360安全管家
360手机管家
360软件
360软件管理
腾讯视频
QQ视频
企鹅视频
腾讯video
企鹅video
腾讯
360卫士
360安全管家
360管家
360网站卫士
卫士360
奇虎360安全卫士
奇虎管家
360
QQ电脑管家
QQ管家
腾讯管家
企鹅电脑管家
腾讯电脑管家
腾讯管家卫士
QQ管家卫士
腾讯qq游戏大厅
腾讯游戏大厅
qq游戏大厅2013
qq游戏大厅2012
qq游戏平台
腾讯游戏平台
企鹅游戏平台
QQ浏览器
qq空间浏览器
qq高速浏览器
qq浏下载览器
qq浏览器2013
qq安全浏览器
雷神加速器
雷神
雷神安全加速器
租号玩
租号玩平台
租号平台
360安全浏览器
360浏览器
360极速浏览器
360急速浏览器
360无痕浏览器
360游戏浏览器
360浏览器7
金山毒霸
金山毒霸2011
金山毒霸2010
金山毒霸2013
金山毒霸2012
金山毒霸6
金山毒霸2008
金山毒霸2009
金山毒霸安全卫士
金山
毒霸
金山安全卫士
腾讯网游加速器
腾讯加速器
QQ加速器
企鹅加速器
腾讯安全加速器
QQ安全加速器
企鹅安全加速器
腾迅视频
360安全卫士
QQ游戏大厅
租号玩上号器
网游加速器
安全卫士360
安装360安全卫士
360主机卫士
360安全卫士64位
360安全卫士xp专版
360杀毒卫士
360杀毒
杀毒卫士
360安全小卫士
QQ电脑安全
qq安全管家
qq软件管家
qq电脑安全管家
qq手机管家pc版
腾讯qq手机管家pc版
腾讯qq电脑管家
腾讯安全管家
腾讯软件管家
腾讯电脑安全
腾讯电脑安全管家
腾讯TV
腾讯qq视频
QQtv
腾讯浏览器
腾讯高速浏览器
腾讯加速浏览器
tengxun浏览器
腾讯安全浏览器
QQ加速浏览器
企鹅浏览器
qq游戏大厅多开
金山毒霸极速版
金山毒霸猎豹版
金山毒霸杀毒
金山毒霸悟空正式版
腾讯网游安全加速器
QQ网游加速器
腾讯网游加速
QQ网游加速
租号云
`.split('\n');
keywordList = Array.from(new Set(keywordList));
const date = new Date().toString()

async function getSugList(keyword) {
  const { data } = await axios({
    url: 'https://suggestion.baidu.com/su',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36',
      'Referer': 'https://www.baidu.com/'
    },
    params: {
      wd: keyword,
      json: 1,
      ie: 'utf-8',
    }
  })
  try {
    const reg2 = /\((.+?)\)/g
    if (data.match(reg2)) {
      let str = data.match(reg2)[0].replace('(', '').replace(')', '')
      const { s } = JSON.parse(str);
      return s.filter(e => e);
    } else {
      return []
    }
  } catch (error) {
    console.log(data)
    return []
  }
}
async function init() {
  for (let i = 0; i < keywordList.length; i++) {
    const keyword1 = keywordList[i];

    const list1 = await getSugList(keyword1);
    let set = new Set();
    // fs.appendFileSync('./keyword.txt', `${keyword1}\n`)
    set.add(keyword1)

    for (let j = 0; j < list1.length; j++) {
      const keyword2 = list1[j];
      const list2 = await getSugList(keyword2);;
      set.add(keyword2)

      // fs.appendFileSync('./keyword.txt', `  ${keyword2}\n`)

      for (let z = 0; z < list2.length; z++) {
        const keyword3 = list2[z]
        // const list3 = await getSugList(keyword3);;
        set.add(keyword3)
        // fs.appendFileSync('./keyword.txt', `    ${keyword3}\n`)

        // for (let o = 0; o < list3.length; o++) {
        //   const keyword4 = list3[o]
        //   // console.log(keyword1, keyword2, keyword3, keyword4)
        //   set.add(keyword4)
        //   // fs.appendFileSync('./keyword.txt', `      ${keyword4}\n`)
        // }
        // console.log(keyword3)
        // await sleep(1000)
      }
    }
    let str = Array.from(set).join('\n')
    fs.appendFileSync(`./keyword_${date}.txt`, `${str}\n\n`)
  }
}

init()
