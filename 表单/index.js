const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');
const 

// 1.配置view
// 2.配置静态文件夹
// 3.设置首页重定首页，当跳转all的时候转向首页
// 4监听所有路由
//   创建工具js 获取所有的文件夹返回数组

//   设置views nkj文件 

//1配置njk模版
nunjucks.configure("views", {
    express: app
});
//2设置静态模版
app.use(express.static('public'));
app.use(express.static('albums'));

app.get('/', function (req, res) {
    
    

    fs.readdir(path.join(__dirname, 'albums'), (err, files) => {
        
        res.render('index.njk', { 'albumArr': files });
    })

})

//查看文件夹下图片
app.get('/:name', function (req, res) {

    fs.readdir(path.join(__dirname, 'albums', req.params.name), (err, files) => {
        // console.log(files);
        res.render('photos.njk', { 'photos': files });

        app.get('/'+req.params.name+'/:img', function (req, res) {

                res.render('photo.njk', { 'img': req.params.img });
            })

        })

    })







app.listen(80);

