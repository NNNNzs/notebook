const axios = require('axios');

const redictFunction = async (url) => {
  axios({
    url: 'https://softdown.zol.com.cn/index.php?c=Down&softid=427310&pos=suote_jingzhun&flag=0&type=jingzhun',
    maxRedirects: 0,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36',
      'Referer': 'https://softdown.zol.com.cn/detail/23/483985.shtml'
    },
  }).then(res => {
    console.log(res)
  })
}

redictFunction()

module.exports.redictFunction = redictFunction;