/**
 * Created by linyuhua on 2017/2/9.
 */
var express = require('express');
var path = require('path');
var ejs = require('ejs');
var app = express();
var bodyParser = require('body-parser')
var router = require('./router/router.js');

app.set('port',process.env.port || 5000);
app.set('views','./view');
app.set('view engine','html');
app.engine('html',ejs.renderFile);

app.use('/static',express.static(path.join(__dirname,'static')));

// body-parser
app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

//解决browsereHistory 手动刷新找不到
app.get('*',function(req,res) {
    res.sendFile(path.join(__dirname,'/view/index.html'))
})

app.post('/api/login',router.login);
app.post('/api/check',router.check);
app.post('/api/upload',router.upload);
app.post('/api/titles',router.titles);
app.post('/api/remove',router.remove);
app.post('/api/single',router.single);
app.post('/api/edit',router.edit);

app.use(function(req,res) {
    res.type('text/plain');
    res.status(404);
    res.send("Can't find");
})
app.use(function(err,req,res) {
    res.status(500);
    res.send("500-server err");
})

app.listen(app.get('port'),function() {
    console.log('The server is starting on http://localhost:' + app.get('port'))
})