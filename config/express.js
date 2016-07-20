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
    flash = require('connect-flash'),
    logger = require('morgan'),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    methodOverride = require("method-override"),
    config = require("./config");
    
module.exports = function (db) {
    // Initialize express app
    var app = express();

    app.set('showStackError', false);
    
    app.use(logger('dev'));
    app.use(bodyParser.json(config.bodyParser.json));// for parsing application/json
    app.use(bodyParser.urlencoded(config.bodyParser.urlencoded));// for parsing application/x-www-form-urlencoded
    app.use(methodOverride());
    // CookieParser should be above session
    app.use(cookieParser());

    //静态文件 // Setting the app router and static folder
    app.use(express.static(path.join(__dirname, 'public')));

    // use session
    app.use(session({
            secret: 'moka',
            resave: true,
            saveUninitialized: true,
            proxy:true,
            store: new mongoStore({
            url: config.db,
            collection : 'Sessions'
        })
    }));

    // connect flash for flash messages - should be declared after sessions
    app.use(flash());

    app.get("/", function (req, res) {
        res.send({status:200})
    });

    // Globbing model files
    config.getGlobbedFiles("./app/modules/**/model/*.js").forEach(function (modelPath) {
        require(path.resolve(modelPath))(db);
    });

    // Globbing routes files
    config.getGlobbedFiles("./app/modules/**/route/*.js").forEach(function (modelPath) {
        require(path.resolve(modelPath))(app);
    });

    // Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
    app.use(function (err, req, res, next) {
        // If the error object doesn't exists
        if (!err) return next();
        // Log it
        console.error(err.stack);
        // Error page
        res.status(500).render('500', {
            error: err.stack
        });
    });

    // Assume 404 since no middleware responded
    app.use(function (req, res) {
        res.status(404).render('404', {
            url: req.originalUrl,
            error: 'Not Found'
        });
    });

    return app;
};