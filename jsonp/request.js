const request = require('request');
const express = require('express');
const app = express();

var abc;
  request('https://api.douban.com/v2/book/1220562', function (error, response, body) {
    // console.log('error:', error); // Print the error if one occurred 
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
    console.log('1'); // Print the HTML for the Google homepage. 
    abc = body
  });

console.log(3);
app.get('/', function (req, res) {
 console.log(2);
 res.send(abc);
  
}).listen(80, function (req, res) {
  console.log('运行成功');
})