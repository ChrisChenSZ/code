const mongoose = require('mongoose');
const db = mongoose.createConnection('localhost', 'chris');

const lengthValidator = function(val){
  if(val && val.length >=5){
    return true;
  }
  return false;
}

const xueshenSchema = new mongoose.Schema({
  'name': {
    type: String,
    require: true,
    unique: true
  },
  age: {
    type: Number,
    min: 10,
    max: 20
  },
  city: {
    type: String,
    enum: ['广州', '深圳']
  },
  other: {
    type: String,
    validate: [lengthValidator, 'err']
  }
});




const xueshenModel = db.model('xueshen',xueshenSchema,'xuesheng');

const xueshenEntity = new xueshenModel({'name':'小方','age':18,'city':'广州','other':'6'});
xueshenEntity.save(function(err,doc){
  if(!err){
    console.log("成功");
  }else{
    console.log('失败',err);
  }
});