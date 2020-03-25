//连接到数据库
var mongoose = require('mongoose');
let dburl = 'mongodb://118.178.224.68:27017/'
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false});

var db = mongoose.connection;//数据库的连接对象
db.on('error', console.error.bind(console, 'connection error:'));//监听我们是否连接错误
db.once('open', function () {//一旦连接成功，就会执行回调函数
    console.log(`我们已成功连上胖东的数据库`);
});