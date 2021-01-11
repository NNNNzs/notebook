// QQ空间相册导出的json文件，通过URL下载原图
const bakJson = require('./20200110_phonebak.json')
const axios = require('axios');
const getPixels = require("get-pixels")
const fs = require('fs')
const savePath = '/Users/nnnnzs/Pictures/phone_bak1/'
const mimeType = ['jpg', 'jpeg', 'png', 'gif']


function filterBakJson(bakJson = []) {
  // 去除video，原因是目前无法检测视频是否完整
  const list = bakJson.filter(e => {
    const isVideo = e.is_video;
    return isVideo
  });
  return list.sort()
}

async function init() {
  const data = filterBakJson(bakJson)

  for (let i = 0; i < data.length; i++) {
    const ele = data[i];
    const index = i;
    const { custom_filename, url, custom_url, is_video, video_info } = ele;
    // const  = video_info
    const fileName = custom_filename;
    const path = `${savePath}${fileName}`
    const isexist = fs.existsSync(path)
    saveVideo(path, custom_url, index)
    if (!isexist) {
      // if (is_video) {
      //   const { video_url } = video_info
      //   saveVideo(path, video_url, index)
      // }
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

async function saveVideo(path, url, index) {
  return new Promise(async (resolve, reject) => {
    const res = await axios({
      url: url,
      method: 'get',
      responseType: 'arraybuffer'
    });
    fs.writeFileSync(path, res.data, "binary");
    console.log(index, 'save ok')
    resolve(path);
  })
}

async function saveImg(path, url, index) {
  return new Promise(async (resolve, reject) => {
    const res = await axios({
      url: url,
      method: 'get',
      responseType: 'arraybuffer',
    })
    fs.writeFileSync(path, res.data, "binary");
    console.log(index, 'save ok')
    resolve(path);
    // 图片检测
    getPixels(path, (err, data) => {
      if (err) {
        console.log(path, '图片有问题')
        fs.appendFileSync('./error.txt', `${path}\n`)
      }
    })
  })
}

init()