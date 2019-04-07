const fs = require('fs');
const path = require('path')
var mysql = {
    readDB(databaseName) {
        let database = fs.readFileSync(path.resolve(__dirname, '../database/' + databaseName + '.json')).toString('utf-8')
        database = JSON.parse(database)
        return database
    },
    updateDB(databaseName, data) {
        data = JSON.stringify(data);
        console.log(data)
        fs.writeFileSync(path.resolve(__dirname, '../database/' + databaseName + '.json'), data)
    },
    select(databaseName, colName) {
        let json = this.readDB(databaseName)
        return json[colName]
    }
}
module.exports = {
    mysql
}