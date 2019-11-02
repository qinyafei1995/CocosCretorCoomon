// 服务器
var express = require('express');
var app = express();


var msgpack = require("msgpack-lite");
// msgpack.encode() 压缩Json
// var buffer = msgpack.encode({"foo": "bar"});
// msgpack.decode() 解压Json
// var data = msgpack.decode(buffer); 


// 压缩Json
// '/pack/:a'这个字段,可以添加路由
app.get('/pack/:a', function(req, res){
    var jsonVal = req.param('a');
    var jsonObject = JSON.parse(jsonVal);
    var buffer = msgpack.encode(jsonObject);
    // console.log('二进制文件',buffer);
    var bufferString = buffer.toString('hex');
    res.send(bufferString);
});

// 解压Json
app.get('/unpack/:b', function(req, res){
    var unPackVal = req.param('b');
    var buffer = new Buffer(unPackVal,'hex');
    var data = msgpack.decode(buffer);
    res.send(data);
});

app.listen(3000);