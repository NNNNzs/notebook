## 全局对象
>global

## __filename
>__filename 表示当前正在执行的脚本的文件名。它将输出文件所在位置的绝对路径，且和命令行参数所指定的文件名不一定相同。 如果在模块中，返回的值是模块文件的路径。

## __dirname
>__dirname 表示当前执行脚本所在的目录。

## 事件驱动
1. var event = new require('events').EventEmitter(); 事件
2. addListener(event, listener) 为指定事件添加一个监听器到监听器数组的尾部
3. on(event, listener[传参]) 为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数
4. once(event, listener直接传参) 添加单词监听器，一次触发后就失效
5. remove[All]Listener(event, listener) 移除[全部]监听器
6. setMaxListeners(n)设置最大监听
7. emit(event, [arg1], [arg2], [...])按参数的顺序执行每个监听器，如果事件有注册监听返回 true


## console
1. console.log("%d",sum)
2. console.info("程序执行完毕")
3. console.error()
4. console.warn()
5. console.dir()
6. console.time("获取数据")
7. console.timeEnd("获取数据")
8. console.trace(message)
9. console.assert(value[,message])

## process
1. process.exit()
2. beforeExit
3. uncaughtException
4. Signal

## fs
*   flag值
    r读取 r+读写 rs同步读取 rs+同步读写 w写入模式(可以不存在) wx写入模式(必须不存在) 
> path为路径名 callback为回调
1. fs.read(fd, buffer, offset, length, position, callback)
2. fs.open(path, flags[, mode], callback(err,fd))  
    r+为读写模式
3. fs.stat(path, callback)
    1. stats.isFile()
    2. stats.isDirectory()
4. fs.writeFile(file, data[, options], callback(err))
5. fs.unlink(path, callback) 删除文件
6. fs.mkdir(path[, mode], callback) 创建目录
7. fs.readdir(path, callback(err,files))读取目录

## url
1. url.parser(url).query hash pathname path  解析url
2. url.format({protocol:"",....})生成url
3. url.resolve
4. url.parse(url,true,true)//query转换成对象

## querystring
1. querystring.stringif({},'&',':');
2. querystring.parse(string,'&',':')
3. querystring.escape(string) 转义
4. querystring.unescape(string) 解义 一般用于获取Hash

## path
1. path.basename('url',[拓展名]) //返回文件路径最后的路径 拓展名可选
2. path.extname('拓展名') //返回文件拓展名 实际就是一个去掉文件的后缀名
3. path.join('','');//拼接Url地址
4. path.parse();返回格式化的

## http
1. http.create(function(req,res){}).listen(port);创建服务器
2. res.writeHead(200,{'Content-Type':'text/plain'}) 在res里面设置
3. 