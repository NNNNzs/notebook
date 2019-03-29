var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://api.nnnnzs.cn:27017/runoob';

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    dbo.collection("site"). find({}).toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
        // console.log(result);
        console.log(JSON.stringify(result))
        db.close();
    });
});