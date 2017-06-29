const express = require('express');

const app = express();

app.get('/',function(req,res){
   
   res.send("连接服务器成功");
  
})


app.listen(8080,function(){
  console.log("打开成功");
})