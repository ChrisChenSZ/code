const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/chirs';

MongoClient.connect(url,(err,db)=>{
  const collection = db.collection('chrismycollection');
 if(!err){
    collection.updateMany({"name":'我改过的数据'},{$set:{'name':"修改多条数据"}},function(err,result){
      if(!err){
        console.log(result.result);
      }
      db.close();
    })

 }
 
})