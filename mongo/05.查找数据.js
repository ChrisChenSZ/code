const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/chirs';

MongoClient.connect(url,(err,db)=>{
  
  const collection = db.collection('mycollection');

  collection.find({}).limit(3).skip(3).toArray(function(err,result){
        if(!err){

          

          console.log(result);
        }
  })
  db.close();
})