const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/chirs';

MongoClient.connect(url,(err,db)=>{
  
  const collection = db.collection("mycollection");
  
  collection.deleteMany({"name":'修改多条数据'},(err,result)=>{
    if(!err){
      console.log(result.result);
    }else{
      console.log("删除失败");
    }

    db.close();
  })

})