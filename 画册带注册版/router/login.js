const express = require('express');
const router = express.Router();
const formidable = require('formidable');
//引入连接数据库模块
const user = require('../models/user.js');

//引入md5加密
const md5 = require('md5');

//登陆get
router.get('/', function (req, res) {
  // console.log(4);
  res.render('login.njk');
})


//登陆post 
router.post('/', function (req, res) {
  //拿到post的值
  const form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    // console.log(fields);
    const username = fields.username;
    const password = fields.password;

    //判断账号和密码不能为空  
    try {
      if (username.length == 0) {
        throw new Error('账号不能为空')
      }
      if (password.length == 0) {
        throw new Error('密码不能为空');
      }
    } catch (err) {
      return res.json({ 'msg': err.message });
    }
    //查找数据库是否有该账号
    user.find({username:username}).then(function (doc) {
        console.log(doc);
      if (doc) {
        if (doc.password == md5(password)) {
          //设置session
          req.session.user = doc;
          res.json({ msg: '登陆成功' })
        } else {
          res.json({ msg: "密码错误" });
        }
      } else {
        res.json({ msg: "账号不存在" });
      }


    }).catch(function (err) {

      res.json({ msg: "登陆失败" })

    })

  })


})

module.exports = router;