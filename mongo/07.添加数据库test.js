const MongoClient = require('mongodb').MongoClient;
const mongoTools = require('./06.mongoTools.js');


const url = 'mongodb://localhost:27017/chirs';

MongoClient.connect(url,(err,db)=>{
  if(!err){
    console.log("连接数据库成功");
    // mongoTools.insertOne(db,'mycollection',{'name':"封装测试多条添加"});
    // mongoTools.insertMany(db,'mycollection',[{'name':"封装测试多条添加"},{'name1':"封装测试多条添加"}]);
    // mongoTools.updateOne(db,'mycollection',{'name':"封装测试添加"},{'name':"封装测试修改"})
    // mongoTools.updateMany(db,'mycollection',{'name':"封装测试添加"},{'name':"封装测试多条修改"});
    mongoTools.deleteOne(db,'mycollection',{'name':"封装测试多条添加"})
   
  }else{
    console.log("连接数据库失败");
  }
  db.close();
})