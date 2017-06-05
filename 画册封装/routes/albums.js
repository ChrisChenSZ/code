
const fs = require('fs');
const path = require('path');
const express = require("express");
const app = express();
const Rounte = express.Router();

// function getdir(){
  Rounte.get('/', function (req, res) {
 
    fs.readdir(path.join(__dirname, '..','albums'), (err, files) => {
        res.render('index.njk', { 'albumArr': files });
    })

})
// }


  // function getImg(){
//查看文件夹下图片
Rounte.get('/:name', function (req, res) {

    fs.readdir(path.join(__dirname,'..', 'albums', req.params.name), (err, files) => {
        // console.log(files);
        res.render('photos.njk', { 'photos': files });

        app.get('/'+req.params.name+'/:img', function (req, res) {

                res.render('photo.njk', { 'img': req.params.img });
            })

        })

    })
  // }



module.exports = Rounte;




