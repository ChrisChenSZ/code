const express = require('express');
const app = express();

// app.get('/',function(req,res){
//   res.send('111');
// })

var url = '/complex.json';
app.get(url, function(req, res) {

    // 默认返回的json 对象
    var obj = {
        "success": false
    }
    
    // 产生一个随机的金额模拟一下可用余额
    var money = Math.floor(Math.random()*10) + 5;

    // 如果请求中有参数 ‘types=ACCOUNT’
    if('types' in  req.query && req.query.types === 'ACCOUNT'){
        obj = {
            "ACCOUNT": {
                "avaiable": money,
                "freezeAmount": 0
            },
            "success": true
        };
    }
    res.jsonp(obj);
});
app.listen(80,function(){
  console.log('连接成功');
})