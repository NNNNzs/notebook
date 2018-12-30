const os = require('os');
const fs = require('fs');

//netWork
const networkInterfaces=os.networkInterfaces();
// console.log(networkInterfaces);
for(let key in networkInterfaces){
    console.log(networkInterfaces[key])
}