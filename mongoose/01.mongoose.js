const mongoose = require('mongoose');

const db = mongoose.createConnection('localhost','chris');

db.on("error",function(){
  console.log('bd error');
})


db.once('open',function(){
  console.log('bd open')
})


const xueshenSchema = new mongoose.Schema({
  name:String,
  age:Number
});

const xueshenModel = db.model('xuesheng',xueshenSchema,'xuesheng');

const xueshenEntity = new xueshenModel({'name':'小强','age':18});

// xueshenEntity.save();


xueshenModel.find((err,docs)=>{
  console.log(docs)
})
