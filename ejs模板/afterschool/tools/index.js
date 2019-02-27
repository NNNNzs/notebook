const fs = require('fs');
var mysql = {
    readDB() {
        let database = fs.readFileSync(__dirname+'/database.json').toString('utf-8')
        database = JSON.parse(database)
        return database
    },
    updataDB(data) {
        data = JSON.stringify(data)
        fs.writeFileSync(__dirname+'/database.json', data)
    },
    select(tableName){
        return mysql.readDB()[tableName]
    }
}
var a  = 1
module.exports = {
    mysql,
    a
}