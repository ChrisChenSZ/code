//使用mongoose连接数据库
const mongoose = require('mongoose');
//连接数据库 第一个是url地址，第二个是集合的名称
const db = mongoose.createConnection('localhost', 'menu');

mongoose.Promise = require('bluebird');

//测试是否连接数据库

db.on('error', function () {
  console.log('相册数据库连接失败');
})

db.once('open', function () {
  console.log('相册数据库连接成功');
})




const albumSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  photo:[]
})

const albumModer = db.model('album', albumSchema, 'album');

module.exports = {
  insert: function (obj) {
    return albumModer.create(obj);
  },
  findOne:function(obj){
    return albumModer.findOne(obj);
  },
  find:function(){
    return albumModer.find();
  }

}