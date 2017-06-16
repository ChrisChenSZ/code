
const express = require('express');
const router = express.Router();
//设置注册路由
const registerRouter = require('./register');
//设置登陆路由
const loginRouter = require('./login.js');
//引入相册模块
const album = require('../models/album.js');
//引入相册路由
const albumRouter = require('./ablum.js');

//主页
router.get('/', function (req, res) {

  res.render('index.njk');
})


//注册路由
router.use('/register',registerRouter)

//登陆路由
router.use('/login',loginRouter);

//管理者页面
router.get('/',function(req,res){
  album.find().then(function(doc){
    console.log(doc);
    res.render('admin.njk',{albumArr:doc})
  }).catch(function(err){
    console.log(err);
  })
})

//相册上传等路由
router.use('/album',albumRouter);


//退出页面
router.get('/loginout',function(req,res){
  req.session.user = null;
  res.send('退出成功');
})

module.exports = router;