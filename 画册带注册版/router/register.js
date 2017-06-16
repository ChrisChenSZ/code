const express = require('express');
const router = express.Router();
//设置上传接收模块
const formidable = require('formidable');
//设置md5
const md5 = require('md5');
//连接数据库模块
const user = require('../models/user.js');



//注册get
router.get('/', function (req, res) {
  res.render('register.njk');
})

//注册post
router.post('/', function (req, res) {

  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    // console.log(fields,files);
    const username = fields.username, password = fields.password, repassword = fields.repassword;

    //判断用户名长度和密码是否不一致
    try {
      if (username.length < 5 || username.length > 10) {
        throw new Error("用户名长度小于5或者大于10");
      }
      if (password != repassword) {
        console.log(2);
        throw new Error('两次输入的密码不一致，请输入一致的密码');
      }

    } catch (error) {
      return res.json({ 'msg': error.message });
    }

    //来到这里说明可以插入到数据库中

    const obj = { 'username': username, 'password': md5(password) };
    console.log(obj);

    user.insert(obj).
    then(function (doc) {
        res.json({ 'msg':'注册成功'});
      }).catch(function(err){
        console.log(err);
        res.json({ 'msg':'注册失败'})

      })
  })

})




module.exports = router;