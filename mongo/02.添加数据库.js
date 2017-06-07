const MongClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/chirs';

MongClient.connect(url,(err,db)=>{
  // if(!err){
  //   const collection = db.collection('chrismycollection');

  //   collection.insertOne({'name':"我插入的数据"},function(err,result){
  //     if(!err){
  //       console.log(result);
  //     }else{
  //       console.log('插入失败');
  //     }
  //   })
  // }

if(!err){
    const collection = db.collection('chrismycollection');

    collection.insertMany([{'name':"我插入的数据1",'name2':'我插入的数据2'},{'name':"我插入的数据1",'name2':'我插入的数据2'}],function(err,result){
      if(!err){
        
        console.log(result);

      }else{
        
        console.log('插入失败');

      }
    })
  }

  db.close();
})