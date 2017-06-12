const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const config = require('config-lite')(__dirname);

//1设置渲染模块
nunjucks.configure('views',{express:app});

//2设置静态文件
app.use(express.static('public'));

app.get('/',function(req,res){
  res.render('index.njk',{'title':config.title});
})

app.listen(config.port,function(){
  console.log('运行成功');
})
