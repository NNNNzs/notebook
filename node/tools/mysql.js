const DB_CONFIG = {
    host: 'api.nnnnzs.cn',
    user: 'newslist',
    password: '123456ni',
    database: 'newslist'
};
const mySql = function sql(DB_CONFIG, sql, val) {
    return new Promise(function (resolve, reject) {
        let connection = mysql.createConnection(DB_CONFIG);
        connection.connect();
        connection.query(sql, val, (err, results) => {
            if (err) {
                reject(err);
                connection.end();

            }
            if (results) {
                resolve(results)
                connection.end();
            }
        });
    })
}
const mySqlAsync = async function(sql, val){
    return await mySql(DB_CONFIG,sql,val)
}

module.exports = mySqlAsync;
