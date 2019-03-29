var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://api.nnnnzs.cn:27017/runoob';
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    var myobj = { name: "MyData", url: [{a:1},{b:2},{c:{asd:2323}}] };
    dbo.collection("site").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("文档插入成功");
        db.close();
    });
});