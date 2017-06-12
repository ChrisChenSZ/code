const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const Mogostore = require('connect-mongo')(session);

app.use(cookieParser());

//配置session
app.use(session({
  resave: false, // 是否重置
  saveUninitialized: false, // 是否强制设置一个session
  secret: 'xiaomage',
  cookie:{maxAge: 7*24*3600*1000},
  store:new Mogostore({
    url:"mongodb://127.0.0.1:27017/chris"
  })
}));

app.get('/',function(req,res){
    if(req.session.user){
      res.send('登陆');
    }else{
      res.send('没登陆')
    }
});

app.get('/login',function(req,res){
    req.session.user = {'name':'666'};
    res.send('登陆成功');

})

app.listen(80);