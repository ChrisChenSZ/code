const MongoClient = require('mongodb').MongoClient;
// url = "mongo://mongodb://localhost:27017/chris";

// MongoClient.connect(url, function (err, db) {
//   if (!err) {
//     console.log('连接数据库成功');



//   } else {
//     console.log('连接数据库失败:' + err);
//   }
//   db.close();
// })

//添加单条数据库
//1添加数据库
/**
 * 
 * @param {db} db 
 * @param {collection} col 
 * @param {obj} json 
 * @param {fn} callback 
 */
function insertOne(db, col, json, callback) {
  //输入集合
  const collection = db.collection(col);

  collection.insertOne(json, function (err, result) {
    if (!err) {
      console.log('插入数据成功');
      if(arguments.length==4){
          callback(result);
        }
    } else {
      console.log('插入失败');
    }
  })
}



//添加多条数据库
/**
 * 
 * @param {db} db 
 * @param {str} col 
 * @param {obj} obj 
 * @param {fn} callback 
 */
function insertMany(db,col, arr, callback) {
  //输入集合
  const collection = db.collection(col);

  collection.insertMany(arr, function (err, result) {
    if (!err) {
      console.log("插入多条数据成功");
      if(arguments.length==4){
          callback(result);
        }
    } else {
      console.log('插入失败');
    }
  })
}

// 修改单条数据库
/**
 * @param {db} db 
 * @param {str} col 
 * @param {obj} obj 
 * @param {newobj} newObj 
 * @param {fn} callback 
 */
function updateOne(db,col, obj, newObj, callback) {
  const collection = db.collection(col);

  collection.updateOne(obj, { $set: newObj }, function (err, result) {
    if (!err) {
      console.log('更新成功');
      if(arguments.length==5){
          callback(result);
        }
    } else {
      console.log('修改数据库失败');
    }

  })

}

//修改多条数据库
/**
 * @param {db} db 
 * @param {str} col 
 * @param {obj} obj 
 * @param {newobj} newObj 
 * @param {fn} callback 
 */
function updateMany(db,col, obj, newObj, callback) {
  const collection = db.collection(col);

  collection.updateMany(obj, { $set: newObj }, function (err, result) {
    if (!err) {
      console.log("更新数据成功");
     if(arguments.length==5){
          callback(result);
        }
    } else {
      console.log('修改数据库失败');
    }

  })

}

// 删除多条数据库
/**
 * 
 * @param {db} db 
 * @param {str} col 
 * @param {obj} obj 
 * @param {fn} callback 
 */
function deleteOne(db,col, obj, callback) {
  const collection = db.collection(col);
  collection.deleteOne(obj, (err, result) => {
    if (!err) {
      console.log('删除成功');
      if(arguments.length==4){
          callback(result);
        }
    } else {
      console.log("删除失败");
    }
  })

}


// 删除多条数据库
/**
 * 
 * @param {db} db 
 * @param {str} col 
 * @param {obj} obj 
 * @param {fn} callback 
 */
function deleteMany(db,col, obj, callback) {
  const collection = db.collection(col);
  collection.deleteMany(obj, (err, result) => {
    if (!err) {
      console.log('删除多条成功');
      if(arguments.length==4){
          callback(result);
        }
    } else {
      console.log("删除失败");
    }
  })

}

/**
 * 
 * @param {db} db 
 * @param {str} col 
 * @param {obj} obj 
 * @param {fn} callback 
 */
function find(db,col,obj,callback){
    obj = obj||{};
   const collection = db.collection(col);
    collection.find(obj).toArray(function(err,result){
        if(!err){
          console.log("查找成功");
          if(arguments.length==4){
          callback(result);
        }
        }else{
           console.log("查找失败");
        }
  })
}

module.exports = {insertOne, insertMany, updateOne,updateMany,deleteOne, deleteMany,find}