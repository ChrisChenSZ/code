const experss = require('express');
const app = express();
const nunjucks = require('nunjucks');




// 1.配置view
// 2.配置静态文件夹
// 3.设置首页重定首页，当跳转all的时候转向首页
// 4监听所有路由
//   创建工具js 获取所有的文件夹返回数组

//   设置views nkj文件 

//1配置njk模版
nunjucks.configure("views",{
    express:app
});


//2设置静态模版
app.use(experss.static('public'))



