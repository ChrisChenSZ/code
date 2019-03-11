const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const db = mongoose.createConnection('localhost', 'menu');

var cookieParser = require('cookie-parser');
const session = require('express-session');

//引入路由

const Router = require('./routes/routes.js');





//1配置njk模版
nunjucks.configure("views", {
    express: app
});


//2设置静态模版
app.use(express.static('public'));
app.use(express.static('albums'));


app.use('/',Router);

app.listen(80, function () {

    console.log('80成功')
});

