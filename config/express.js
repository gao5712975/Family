/**
 * Created by moka on 16-7-18.
 */
"use strict";
var express = require('express'),
    path = require("path"),
    nwPath = process.execPath,
    nwDir = path.dirname(nwPath),
    session = require("express-session"),
    mongoStore = require('connect-mongo')(session),
    redisStore = require('connect-redis')(session),
    flash = require('connect-flash'),
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
    app.use(express.static('www'));
    //use session
    // app.use(session({
    //     secret: 'moka',
    //     resave: true,
    //     cookie: {
    //         secure:'auto',
    //         httpOnly:true,
    //         maxAge:20 * 1000
    //     },
    //     saveUninitialized: true,
    //     proxy:true,
    //     store: new mongoStore(config.mongoStore)
    // }));
    // app.use(session({
    //     secret: 'moka',
    //     resave: true,
    //     saveUninitialized: true,
    //     cookie: {
    //         secure:'auto',
    //         httpOnly:true,
    //         maxAge:20 * 1000
    //     },
    //     store: new redisStore(config.redisStore)
    // }));

    app.use(flash());

    app.use(favicon('public/favicon/favicon.ico'));
    
    app.all('*',function (req, res, next) {
        let url = req.originalUrl;
        let token = req.get('express-token-key');
        if(config.whiteUrlList.indexOf(url) != -1){
            if(req.session){
                if(req.session.userSession){
                    console.info(req.session.cookie.maxAge);
                    req.session.cookie.expires = new Date(Date.now() + 5 * 1000);
                    req.session.cookie.maxAge = 5 * 1000;
                    req.session.save();
                    res.send({code:200});
                } else{
                    next();
                }
            }else{
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
            }
        }else{
            if(req.session){
                if(req.session.userSession){
                    req.session.cookie.expires = new Date(Date.now() + 5 * 1000);
                    req.session.cookie.maxAge = 5 * 1000;
                    req.session.save();
                    next();
                }else{
                    res.send({code:403});
                }
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
        }
    });

    config.getGlobFiles("./app/modules/base/**Auto.js").forEach(function (modelPath) {
        require(path.resolve(modelPath))(app);
    });

    // Globbing model files
    config.getGlobFiles("./app/modules/**/model/*.js").forEach(function (modelPath) {
        require(path.resolve(modelPath))(db);
    });

    // Globbing routes files
    config.getGlobFiles("./app/modules/**/route/*.js").forEach(function (modelPath) {
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