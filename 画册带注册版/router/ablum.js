const express = require('express');
const router = express.Router();
//设置上传接收模块
const formidable = require('formidable');
//引入相册连接数据库模块
const album = require('../models/album.js');
const path = require('path');

//设置创建相册
router.post('/create',function(req,res){
  const form = new formidable.IncomingForm();
  form.parse(req,function(err,fields,files){
      //  console.log(fields);{ albumname: '生活' }
      const obj = {name:fields.albumname};
      //插入到相册数据库中
      album.insert(obj).then(function(doc){
        if(doc){
         return  res.json({'msg':'创建成功'}); 
        }else{
         return res.json({'msg':'创建失败'}); 
        }
      }).catch(function(err){
          res.json({msg:"创建失败"});
      })
  })
})

//设置上传相册
router.post('/upload',function(req,res){
    
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname,'..','upload');
    form.keepExtensions = true;
    form.parse(req,function(err,fields,files){
      // console.log(fields,files);
      const photoName = path.basename(files.file.path);
      const obj = {name:fields.albumname};
      album.findOne(obj).then(function(doc){
        if(doc){
          doc.photo.push(photoName);
          doc.save(function(err,result){
              
            if(!err){
                return  res.json({'msg':'创建成功'});
            }else{
                return  res.json({'msg':'保存失败'})
            }
          })
           
        }else{
          return  res.json({'msg':'doc为空创建失败'}); 
        }
      }).catch(function(err){
           return  res.json({'msg':'创建失败'}); 
      })
      
    })

})

module.exports = router;