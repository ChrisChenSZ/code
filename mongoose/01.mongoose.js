const mongoose = require('mongoose');

const db = mongoose.createConnection('localhost','chris');

db.on("error",function(){
  console.log('bd error');
})


db.once('open',function(){
  console.log('bd open')
})


const xueshenSchema = new 