const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get("/",(req,res)=>{
  res.send(req.cookies.name);
})

app.get('/search/:name',(req,res)=>{
  let arr = [];
  if(req.cookies.name){

    arr = req.cookies.name;

}
const aihao = req.params.name;

arr.push(aihao);

res.cookie('name',arr);

res.send(req.params.name);

})

app.listen(80);