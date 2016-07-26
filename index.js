var express = require('express');
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var path = require('path');
var file = require('file');
var app = express();

// 基于该目录创建项目目录

var baseDir = '/data/h5';

// 跨域解决

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
 
app.post('/fis3-deploy', function (req, res) {

  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    var filesTmp = JSON.stringify(files,null,2);
    if(err){
      console.log('parse error: ' + err);
    }else{
      var inputFile = files.file[0];
      var uploadedPath = inputFile.path;
      var dir = path.join(baseDir, fields.to[0], '..');
      file.mkdirsSync(dir);
      fs.rename(uploadedPath, path.join(baseDir, fields.to[0]), function(err) {
        if(err){
          res.send('1');
        }else{
          res.send('0');
        }
      });
    }
  });
})
 
app.listen(6030);