const fs = require('fs');
const path = require('path');
const currentpath = path.join(__dirname, '..', 'albums');
function getdir(callback) {
  fs.readdir( currentpath, (err, files) => {

    callback(err,files);
  })
}

function getImg(getImgName,callback) {
  fs.readdir(path.join(currentpath,getImgName), (err, files) => {

     callback(err,files);
  })

}

module.exports = {getdir,getImg}