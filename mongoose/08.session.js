const express = require('express');


var cookieParser = require('cookie-parser');

const session = require('express-session');

const app = express();

app.use(cookieParser());

app.use(session({
  resave: false, // 是否重置
  saveUninitialized: false, // 是否强制设置一个session
  secret: 'xiaomage',
  cookie:{maxAge: 7*24*3600*1000}
}));


app.get('/',(req,res)=>{
  if(req.session.user){
    res.send(req.session.user);
  }else{
    res.send("没有登陆");
  }
})
app.get('/login',(req,res)=>{
  req.session.user = {"username":"zs",'password':123123};
  res.send('登陆成功');
})

app.get('/loginOut',(req,res)=>{
  req.session.user = null;
  res.send("退出成功");
})



app.listen(80);