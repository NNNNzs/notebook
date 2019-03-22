const fs = require('fs');
const path = require('path')
var mysql = {
    readDB(tableName) {
        let database = fs.readFileSync(path.resolve(__dirname, '../database/'+tableName+'.json')).toString('utf-8')
        database = JSON.parse(database)
        return database
    },
    updataDB(tableName,data) {
        data = JSON.stringify(data)
        fs.writeFileSync(path.resolve(__dirname, '../database/'+tableName+'.json'), data)
    },
    select(tableName,colName){
        let json = this.readDB(tableName)
        return json[colName]
    }
}
module.exports = {
    mysql
}