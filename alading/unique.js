const fs = require('fs');

const str = fs.readFileSync('/Users/nnnnzs/project/notebook/keyword.txt').toString('utf-8')

// console.log(str)
let list = str.split('\n');
list = Array.from(new Set(list)).filter(e=>e).join('\n')
fs.writeFileSync('./排重.txt',list)
