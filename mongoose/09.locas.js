const express = require('express');
const app = express();

const  nunjucks = require('nunjucks');

nunjucks.configure("view", {
    express: app
});

app.use(function(req,res,next){
    res.locals.user = '我';
    next();
})

app.get('/',function(req,res){
    res.render('09.locas.njk');
})



app.get('/login',function(req,res){
    res.render('09.locas.njk');
})



app.listen(80);

