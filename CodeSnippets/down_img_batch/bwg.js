// QQ空间相册导出的json文件，通过URL下载原图
const bakJson = require('./bwg_index.json')
const axios = require('axios');
const getPixels = require("get-pixels")
const fs = require('fs')
const savePath = '/Users/nnnnzs/Pictures/bwg_index'

const path = require('path')

async function init() {
  const data = bakJson
  console.log(data.length)
  for (let i = 0; i < data.length; i++) {
    const ele = data[i];
    const index = i;
    let fileName = ele;
    const absolutePath = ele.startsWith('http:');
    if (absolutePath) {
      fileName = fileName.replace('http://www.mas-museum.com','');
    }
    const path = `${savePath}${fileName}`
    const isexist = fs.existsSync(path)

    if (!isexist) {
      saveImg(path, fileName, index)
      await sleep(100);
    }
    console.log(`${i}/${data.length}`)
  }
}

const sleep = async (duration) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration);
  });
};

async function saveImg(path, url, index) {
  return new Promise(async (resolve, reject) => {
    let res;
    try {
      res = await axios({
        url: 'http://www.mas-museum.com/' + url,
        method: 'get',
        responseType: 'arraybuffer',
      })
      let lastPath = path.substring(0, path.lastIndexOf("/"));

      mkdirsSync(lastPath);
      fs.writeFileSync(path, res.data, "binary");
      // console.log(index, 'save ok')
      resolve(lastPath);
      // 图片检测
      getPixels(path, (err, data) => {
        if (err) {
          console.log(path, '图片有问题')
          fs.appendFileSync('./error.txt', `图片有问题 ${path}\n\n`)
          fs.unlink(path,function(){

          })
        }
      })
    } catch (e) {
      fs.appendFileSync('./error.txt', `${path}\n${JSON.stringify(e)}\n\n`)
      
    }
  })
}

function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}
init()