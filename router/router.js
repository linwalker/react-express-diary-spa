/**
 * Created by linyuhua on 2017/2/10.
 */
var jwt = require ('jwt-simple');
var Post = require('../model/post');
var password = '123';
var secret = 'secret';
exports.login = function(req,res) {
    req.setMaxListeners(0);
    var payload = req.body;
    if(payload.password == password) {
        console.log('Correct password');
        var token = jwt.encode(payload,secret);
        res.json({token:token,success:true});
    } else {
        console.log('Wrong password!');
        res.json('please input correct password')
    }
}

// check whether it is right
exports.check = function(req, res) {
    req.setMaxListeners(0)
    var token = req.body.token
    var decoded = jwt.decode(token, secret)
    if(decoded.password === password) {
        console.log("matched!")
        res.json({ match: true })
    } else {
        res.json({ match: false })
    }
}

exports.upload = function(req, res) {
    req.setMaxListeners(0)
    var token = req.headers['authorization'];
    //var token = req.body.token;
    if(!token) {
        // have no token
        res.sendStatus(401)
    } else {
        try {
            var decoded = jwt.decode(token.replace('Bearer ',''), secret)
            // the password is correct
            if(decoded.password === password) {
                // new article
                var article = req.body.article
                // articles.push(newArticle)
                var newArticle = new Post({
                    title: article.title,
                    description: article.description,
                    content: article.content
                })
                newArticle.save(function(err) {
                    if(err) {
                        res.json({ok:false})
                    } else {
                        res.json({ok:true})
                    }
                })
            } else {
                res.json({ok:false});
            }
        } catch (e) {
            res.sendStatus(401)
        }
    }
}


function sendTitles(err, posts, res, count){
    if(err) {
        posts = []
    }
    res.send({
        articles: posts,
        ok: true,
        count: count
    })
}

exports.titles = function(req, res) {
    req.setMaxListeners(0)
    switch(req.body.type) {
        case "HOME":
            Post.getTen(req.body.page, function(err, posts, count) {
                sendTitles(err, posts, res, count)
            })
            break
        case "ARTICLE":
            Post.getArchive(function(err, posts) {
                sendTitles(err, posts, res)
            })
            break
        case "TAGS":
            Post.getTag(req.body.tagName, function(err, posts) {
                sendTitles(err, posts, res)
            })
            break
        case "SEARCH":
            Post.search(req.body.searchString, function(err, posts) {
                sendTitles(err, posts, res)
            })
            break
        default:
            res.send({
                ok: false
            })
            break
    }
}

exports.remove = function(req,res) {
    req.setMaxListeners(0);
    var day = req.body.day;
    var title = req.body.title;
    Post.remove(day,title,function(err) {
        if(err) {
            res.send({ok:false});
        } else {
            res.send({ok:true})
        }
    })
}

exports.single = function(req,res) {
    req.setMaxListeners(0);
    var day = req.body.day;
    var title = req.body.title;
    Post.getOne(day,title,function(err,article) {
        if(err) {
            res.send({
                ok:false
            });
        } else {
            res.send({
                ok:true,
                article:article
            })
        }
    })
}

exports.edit = function(req,res) {
    req.setMaxListeners(0);
    var token = req.headers["authorization"];
    if(!token) {
        res.sendStatus(401);
    } else {
        try {
            var decoded = jwt.decode(token.replace('Bearer ',''), secret);
            if(decoded.password === password) {
                var article = req.body.article;
                var newArticle = {
                    title: article.title,
                    description: article.description,
                    content: article.content
                }
                Post.edit(req.body.oldDay,req.body.oldTitle,newArticle,function(err) {
                    if(err) {
                        res.send({
                            ok:false
                        })
                    } else {
                        res.send({
                            ok:true
                        })
                    }
                })
            }
        } catch(e) {
            res.sendStatus(401);
        }
    }
}