/**
 * Created by moka on 16-7-18.
 */
"use strict";
var express = require('express'),
    path = require("path"),
    // nwPath = process.execPath,
    // nwDir = path.dirname(nwPath),
    // session = require("express-session"),
    // mongoStore = require('connect-mongo')(session),
    // redisStore = require('connect-redis')(session),
    // flash = require('connect-flash'),
    logger = require('morgan'),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    cors = require('cors'),
    config = require("./config"),
    Config = require("../app/config/config"),
    favicon = require('serve-favicon'),
    Redis = require('../app/modules/base/redis');
    
module.exports = function (db) {
    var app = express();
    app.use(cors());
    app.set('showStackError', false);
    
    app.use(logger('dev'));
    app.use(bodyParser.json(config.bodyParser.json));// for parsing application/json
    app.use(bodyParser.urlencoded(config.bodyParser.urlencoded));// for parsing application/x-www-form-urlencoded

    // CookieParser should be above session
    app.use(cookieParser());

    //静态文件 // Setting the app router and static folder
    app.use(express.static('public'));
    // app.use(express.static('www'));

    // app.use(flash());

    app.use(favicon('public/favicon/favicon.ico'));

    app.all('*',function (req, res, next) {
        let url = '/';
        console.info(req.originalUrl);
        if(req.originalUrl && req.originalUrl != url){
            url = req.originalUrl;
            if(/^.*(\?).*$/.test(url)){
                url = req.originalUrl.split("?")[0];
            }else{
                let _urlLeg = req.originalUrl.length;
                if(req.originalUrl.lastIndexOf('/') == _urlLeg - 1){
                    url = req.originalUrl.substr(0,_urlLeg-1)
                }
            }
        }
        let token = req.get(Config.tokenHeaders);
        if(config.whiteUrlList.indexOf(url) != -1){
            Redis((client) => {
                client.get(`${token}`,(err,doc) => {
                    if(doc){
                        client.expire(`${token}`, Config.sessionTtl);
                        client.quit();
                        res.send({code:200});
                    }else{
                        next();
                    }
                })
            });
        }else{
            Redis((client) => {
                client.get(`${token}`,(err,doc) => {
                    if(doc) {
                        client.expire(`${token}`, Config.sessionTtl);
                        client.quit();
                        next();
                    } else{
                        res.send({code:403});
                    }
                })
            });
        }
    });

    // Globbing model files
    config.getGlobFiles("./app/modules/**/model/*.js").forEach(function (modelPath) {
        require(path.resolve(modelPath))(db);
    });

    // Globbing routes files
    config.getGlobFiles("./app/modules/**/route/*.js").forEach(function (modelPath) {
        require(path.resolve(modelPath))(app);
    });
    
    //weixin
    config.getGlobFiles("./app/business/weixin/weixinRoute.js").forEach(function (modelPath) {
        require(path.resolve(modelPath))(app);
    });

    config.getGlobFiles("./app/modules/base/**Auto.js").forEach(function (modelPath) {
        require(path.resolve(modelPath))(app);
    });

    //Assume 500 since no middleware responded
    app.use(function (err, req, res, next) {
        if (!err) return next();
        res.statusCode = 500;
        res.send({
            status:500,
            url:req.originalUrl,
            error: err.stack
        })
    });

    // Assume 404 since no middleware responded
    app.use(function (req, res) {
        res.statusCode = 404;
        res.send({
            status:404,
            url:req.originalUrl
        })
    });

    return app;
};