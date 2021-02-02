const axios = require('axios');
const keywordStr = require('./keyword')
// const keywordList = keywordStr.split('\n');
const fs = require('fs')
const keywordList = `
腾讯视频 
QQ视频
`


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
  // fs.appendFileSync(JSON.stringify(keywordList))
  // return;
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
        const list3 = await getSugList(keyword3);;
        set.add(keyword3)
        // fs.appendFileSync('./keyword.txt', `    ${keyword3}\n`)

        for (let o = 0; o < list3.length; o++) {
          const keyword4 = list3[o]
          // console.log(keyword1, keyword2, keyword3, keyword4)
          set.add(keyword4)
          // fs.appendFileSync('./keyword.txt', `      ${keyword4}\n`)
        }
        // console.log(keyword3)
        // await sleep(1000)
      }
    }
    let str = Array.from(set).join('\n')
    fs.appendFileSync('./keyword.txt', `${str}\n`)
  }
}

init()

async function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  })
}