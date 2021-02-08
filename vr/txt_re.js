// txt里面文件反转
const fs = require('fs')
const list = fs.readFileSync('./vr_url_r.txt').toString('utf-8').split('\n').reverse();

const str = list.join('\n')
fs.writeFileSync('./vr_url_r_r.txt', str)
