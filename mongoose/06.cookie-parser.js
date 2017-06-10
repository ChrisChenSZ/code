const express = require('express');
const app = express();

var cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/',function(req,res){
  res.cookie('name','设置cookie',{ maxAge: 900000 });
  console.log(req.cookies.name);
  res.send('hhh');
})

app.listen(80);