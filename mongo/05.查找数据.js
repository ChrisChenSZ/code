const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/chirs';

MongoClient.connect(url,(err,db)=>{
  
  const collection = db.collection('mycollection');

  collection.find({}).limit()..toArray(function(err,result){
        if(!err){

          

          console.log(result[0].title);
        }
  })
  db.close();
})