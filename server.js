const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const path = require('path');


//启动服务器的时候同时启动数据库
require('./db/connect');

//post 数据的解析 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//静态资源路径
app.use('/public', express.static(path.join(__dirname, './public')));

//用路由的方法加入各个模块
// 文件上传的模块
let uploadRouter = require('./router/uploadImgRouter');
app.use('/admin/upload', uploadRouter);
// 用户注册模块
let userRouter = require('./router/userRouter');
app.use('/admin/user', userRouter);
// 物品操作模块
let goodsRouter = require('./router/goodsRouter');
app.use('/admin/goods', goodsRouter);
// 物品操作模块
let kindRouter = require('./router/kindRouter');
app.use('/admin/goodskind', kindRouter);

app.listen(3333, () => {
    console.log(`/**
    *
    * ━━━━━━神兽出没━━━━━━
    * 　　 ┏┓     ┏┓
    * 　　┏┛┻━━━━━┛┻┓
    * 　　┃　　　　　 ┃
    * 　　┃　　━　　　┃
    * 　　┃　┳┛　┗┳  ┃
    * 　　┃　　　　　 ┃
    * 　　┃　　┻　　　┃
    * 　　┃　　　　　 ┃
    * 　　┗━┓　　　┏━┛　Code is far away from bug with the animal protecting
    * 　　　 ┃　　　┃    神兽保佑,代码无bug
    * 　　　　┃　　　┃
    * 　　　　┃　　　┗━━━┓
    * 　　　　┃　　　　　　┣┓
    * 　　　　┃　　　　　　┏┛
    * 　　　　┗┓┓┏━┳┓┏┛
    * 　　　　 ┃┫┫ ┃┫┫
    * 　　　　 ┗┻┛ ┗┻┛
    *
    * ━━━━━━感觉萌萌哒━━━━━━
    */`)
})