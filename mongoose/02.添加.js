const mongoose = require('mongoose');
const db  = mongoose.createConnection('localhost','chris');


db.on('error',function(){
  console.log('打开失败');
})

db.once('open',function(){
  console.log('打开成功');
})

const xueshenSchema = new mongoose.Schema({
  'name':String,
  "age":Number
})


const xueshenModel = db.model('xueshen',xueshenSchema,'xuesheng');


// const xueshengEntity = new xueshenModel({"name":"小明","age":24});

// xueshengEntity.save();
// xueshenModel.find(function(err,docs){
//     console.log(docs);
// })

// xueshenModel.create({'name':'小红','age':16});

// xueshenModel.create({'name':'小红','age':16});
//    xueshenModel.create([{'name':'小红1','age':16},{'name':'小红2','age':16}],function(err,doc){
//      console.log(doc);
//    })

//删除单条数据
// xueshenModel.findOne({'name':"小红"},function(err,doc){
//   console.log(doc)
//   doc.remove(function(err){
//     if(!err){
//       console.log('删除成功')
//     }else(
//       console.log('删除失败')
//     )
//   })
// })

//删除所有数据
// xueshenModel.remove({'name':"小明"},function(err,result){
//       if(!err){
//         console.log(result);
//       }else{
//         console.log('删除失败')
//       }
// });

// xueshenModel.findOne({'name':'小强'},function(err,doc){
//   if(!err){
//     console.log(doc)
//     doc.name = "小小强"
//     doc.save(function(err,doc){
//       if(!err){
//         console.log("修改后的值为", doc);
//       }
//     });
//   }
// })

  //  xueshenModel.update({"name":'小红1'},{$set:{'name':"小红回来了"}},function(err,doc){
  //    if(!err){
  //      console.log("修改成功")
  //    }else{
  //      console.log('修改失败')
  //    }
  //  })

  //    xueshenModel.update({"name":'小红1'},{$set:{'name':"小红回来了"}},{multi:true},function(err,doc){
  //    if(!err){
  //      console.log("修改成功")
  //    }else{
  //      console.log('修改失败')
  //    }
  //  })

      xueshenModel.find().where('name').equals('小小强').select('name').exec(function(err,doc){
        console.log({'result':doc});
      })
