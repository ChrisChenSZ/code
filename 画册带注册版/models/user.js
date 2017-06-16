//使用mongoose连接数据库
const mongoose = require('mongoose');
//连接数据库 第一个是url地址，第二个是集合的名称
const db = mongoose.createConnection('localhost', 'menu');

mongoose.Promise = require('bluebird');

//测试是否连接数据库

db.on('error', function () {
  console.log('数据库连接失败');
})

db.once('open', function () {
  console.log('数据库连接成功');
})



const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

const userModer = db.model('user', userSchema, 'user');

module.exports = {
  insert: function (obj) {
    return userModer.create(obj);
  },
  find:function(obj){
    return userModer.findOne(obj);
  }

}