const express = require('express');
const app = express();
const Router = express.Router();

const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const db = mongoose.createConnection('localhost', 'menu');

var cookieParser = require('cookie-parser');
const session = require('express-session');


//配置session
Router.use(session({
  resave: false, // 是否重置
  saveUninitialized: false, // 是否强制设置一个session
  secret: 'xiaomage',
  cookie:{maxAge: 7*24*3600*1000}
}));

// 配置body-parser
// 处理  x-www-form-urlencoded
Router.use(bodyParser.urlencoded({ extended: true }))
// 处理 application/json
Router.use(bodyParser.json())


Router.get('/', function (req, res) {
   
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



Router.post('/PersonalPage', function (req, res) {

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
Router.get('/register.njk', function (req, res) {


    res.render('register.njk');
})

//账号注册发送
Router.post('/registeredStatu.njk', function (req, res) {
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
Router.get('/loginOut.njk',(req,res)=>{
  req.session.user = null;
  res.render('loginOut.njk', { 'status': "已退出登陆" })
})


module.exports = Router;