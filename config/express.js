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
    multer = require('multer'),
    cookieParser = require("cookie-parser"),
    config = require("./config");
    
module.exports = function (db) {
    // Initialize express app
    var app = express();

    app.set('showStackError', false);
    
    app.use(logger('dev'));
    app.use(bodyParser.json(config.bodyParser.json));// for parsing application/json
    app.use(bodyParser.urlencoded(config.bodyParser.urlencoded));// for parsing application/x-www-form-urlencoded

    // CookieParser should be above session
    app.use(cookieParser());

    //静态文件 // Setting the app router and static folder
    app.use(express.static('public'));
    // app.use(express.static('www'));

    //use session
    app.use(session({
        secret: 'moka',
        resave: true,
        cookie: {maxAge: 30 * 60 * 1000},
        saveUninitialized: true,
        proxy:true,
        store: new mongoStore(config.mongoStore)
    }));
    // app.use(session({
    //     resave: true,
    //     saveUninitialized: true,
    //     secret: 'moka',
    //     // cookie: {maxAge: 30 * 60 * 1000},
    //     cookie: {
    //         secure: true,
    //         maxAge: 30 * 60 * 1000
    //     },
    //     store: new redisStore(config.redisStore)
    // }));

    app.use(flash());

    app.all("*", function (req, res) {
        res.send({status:2})
    });

    app.all("*", function (req, res,next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'X-Request-With,Content-Type');
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        if (req.method == 'OPTIONS') {
            res.statusCode = 200;
            res.send('OPTIONS');
        } else {
            next();
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

    //Assume 500 since no middleware responded
    app.use(function (err, req, res, next) {
        if (!err) return next();
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