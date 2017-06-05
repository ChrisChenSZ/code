const MongoClient = require('mongodb').MongoClient

const url='mongodb://localhost:27017/chris';

MongoClient.connect(url,function(err,db){
  if(!err){
    console.log('连接数据库成功');
  }else{
    console.log('连接数据库失败');
  }
  db.close();
})