const mongoose = require('mongoose');

const db = mongoose.createConnection('localhost','chris');


db.on('error',function(){
   console.log('连接失败');
})

db.once('open',function(){
  console.log('连接成功')
})


const shujiSchema = new mongoose.Schema({
  'name':String,
  'zuozhe':{
    type:mongoose.Schema.Types.ObjectId,
    ref:'zuozheid'
  }
})

const zuozheSchema = new mongoose.Schema({
  'name':String,
  'age':Number
})

const shujiSModel = db.model('shuji',shujiSchema,"shuji");
const zuozheModel = db.model('zuozheid',zuozheSchema,'zuozhe');

const zuozheEntity = new zuozheModel({'name':'chirs','age':'18'});

// zuozheEntity.save(function(err,doc){
// if(!err){
//   console.log('存入zuozhe成功')
//   const shujiEntity = new shujiSModel({'name':"老人与海",'zuozhe':doc._id});
//   shujiEntity.save();
// }
// })

// zuozheModel.findOne({'name':'chirs'},function(err,doc){
//   if(!err){
//     const shujiEntity = new shujiSModel({'name':"红楼梦",'zuozhe':doc._id});
//     shujiEntity.save();
//   }
// })

shujiSModel.find({}).populate('zuozhe').exec(function(err,res){
  console.log(res);
})


