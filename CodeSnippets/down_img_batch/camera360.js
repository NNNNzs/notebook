// camera360原图爬虫工具
const axios = require('axios');
const qs = require('querystring');
const fs = require('fs')
const moment = require('moment')
async function init() {
  axios({
    url: 'https://y.camera360.com/applet/photo/get-photos',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify({
      orderId: '202101011712089154',
      limit: '482',
      page: 0,
    })
  }).then(res => {
    const { data } = res.data;
    let imageList = data.data;
    imageList.forEach(async (ele, index) => {
      const { etag, createDateTime } = ele;
      let fileName = moment(new Date(Number(createDateTime))).format('YYYYMMDDHHssmm')
      const isexist = fs.existsSync(`/Users/nnnnzs/Pictures/party/${fileName}_${etag}.jpeg`)
      if (!isexist) {
        await saveImg(etag, fileName, index)
      }
    })
  })
}

async function saveImg(eTag = 'AIFumAzbcQWwR0zJ6Xk_AVHNPZ5xGv', fileName = '232', index = '0') {
  axios({
    url: `https://c360-o2o.c360dn.com/${eTag}`,
    method: 'get',
    responseType: 'arraybuffer',
  }).then(res => {
    fs.writeFileSync(`/Users/nnnnzs/Pictures/party/${fileName}_${eTag}.jpeg`, res.data, "binary");
    console.log(index)
  })
}

init()