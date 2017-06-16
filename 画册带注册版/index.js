const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
//设置全局变量
const config = require('config-lite')(__dirname);
//设置请求数据库模块
const mongoose = require('mongoose');
const Router = require('./router/index.js');
//导入cookieParser
const cookieParser = require('cookie-parser');
//导入session
const session = require("express-session");
//导入重启服务器session不断开
const MongoStore = require('connect-mongo')(session);

app.use(cookieParser());
app.use(session({
  resave: false, // 是否重置
  saveUninitialized: false, // 是否强制设置一个session
  secret: 'user',
  cookie:{maxAge: 7*24*3600*1000},
  // store用来配置session存储在数据库
  store: new MongoStore({
    //url指定你的数据库地址
    url: 'mongodb://127.0.0.1:27017/menu'
  })
}));


//设置渲染模块
nunjucks.configure('views',{express:app});

//设置静态文件
app.use(express.static('public'));

//设置中间件
app.use(function (req, res, next) {
  app.locals.title = '相册';
  res.locals.user = req.session.user;
  next();
})

app.use('/',Router);

app.listen(config.port,function(){
  console.log('运行成功');
})
