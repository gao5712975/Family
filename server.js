/**
 * Created by moka on 16-7-18.
 */
var express = require("./config/express"),
    config = require("./config/config"),
    mongoose = require("mongoose");

var options = { server: { socketOptions: { keepAlive: 1 } } };
var db = mongoose.connect(config.db,options).connection;

db.once('open',function () {
    var app = express(db);
    app.listen(config.port);
    // Logging initialization
    console.log('MEAN.JS application started on port ' + config.port);
});