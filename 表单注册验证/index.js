const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const db = mongoose.createConnection('localhost', 'menu');

var cookieParser = require('cookie-parser');
const session = require('express-session');




//配置session
app.use(session({
  resave: false, // 是否重置
  saveUninitialized: false, // 是否强制设置一个session
  secret: 'xiaomage',
  cookie:{maxAge: 7*24*3600*1000}
}));

// 配置body-parser
// 处理  x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// 处理 application/json
app.use(bodyParser.json())



//1配置njk模版
nunjucks.configure("views", {
    express: app
});


//2设置静态模版
app.use(express.static('public'));
app.use(express.static('albums'));


app.get('/', function (req, res) {

if(req.session.user){
    res.render('PersonalPage.njk', { 'status': "登陆成功" });
  }else{
    res.render('index.njk');
  }
    // res.render('index.njk');
    


})

const userSchema = new mongoose.Schema({
    'email': {
        type: String,
        require: true,
        unique: true
    },
    'password': Number,
    'remeberMe': String,
});




const userModel = db.model('user', userSchema, 'user');



app.post('/PersonalPage.njk', function (req, res) {

    console.log('1', req.body);

    if(req.body.email&&req.body.password){

       userModel.findOne({ 'email': req.body.email, 'password': req.body.password }, function (err, doc) {

           console.log(err);

        if (!err) {
            if (doc == null) {

                console.log('登入失败');
                res.render('PersonalPage.njk', { 'status': "账号未注册或密码错误" })
            } else {
                console.log('登入成功');
                
                req.session.user = { 'email': req.body.email, 'password': req.body.password };
                
                res.render('PersonalPage.njk', { 'status': "登陆成功" });
            }
        }else{
            console.log('查询不到');
             res.render('PersonalPage.njk', { 'status': "密码错误" })
        }
    });

    }else{
         res.render('PersonalPage.njk', { 'status': "请输入账号和密码" })
    }
    
})

//进入注册页面
app.get('/register.njk', function (req, res) {


    res.render('register.njk');
})

//账号注册发送
app.post('/registeredStatu.njk', function (req, res) {
    console.log(req.body);
    userModel.create({ 'email': req.body.email, 'password': req.body.password }, function (err, doc) {
        if (!err) {
            if (doc == null) {
                console.log('注册失败');
                res.render('registeredStatu.njk', { 'status': "账号已被注册" })
            } else {
                console.log('注册成功');
                res.render('registeredStatu.njk', { 'status': "注册成功" })
            }
        } else {
            console.log('添加数据库失败')
            res.render('registeredStatu.njk', { 'status': "账号已被注册" })
        }

    });

})

//退出
app.get('/loginOut.njk',(req,res)=>{
  req.session.user = null;
  res.render('loginOut.njk', { 'status': "已退出登陆" })
})



app.listen(80, function () {

    console.log('80成功')
});

