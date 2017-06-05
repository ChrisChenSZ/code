const fs = require('fs');
const path = require('path');
const express = require("express");
const app = express();
const Rounte = express.Router();
const fsTools = require("../model/fsTools.js")


  Rounte.get('/', function (req, res) {
      fsTools.getdir((err,files)=>{
          res.render('index.njk', { 'albumArr': files });
      })
        
    })

//查看文件夹下图片
  Rounte.get('/:name', function (req, res) {
     fsTools.getImg(req.params.name,(err,files)=>{
       // console.log(files);
        res.render('photos.njk', { 'photos': files,"name":req.params.name});
        app.get('/'+req.params.name+'/:img', function (req, res) {
                res.render('photo.njk', { 'img': req.params.img });
            })

        })

     });
       

       






module.exports = Rounte;




