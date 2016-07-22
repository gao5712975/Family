/**
 * Created by Yuan on 2016/7/19.
 */
'use strict';
var mongoose = require("mongoose");
var Auth = mongoose.model('Auth');

exports.saveEntity = function (req, res) {
    var auth = new Auth(req.body);
    auth.save(req.body).then(
        function (doc) {
            res.send(doc);
        },
        function (err) {
            res.statusCode = 500;
            res.send(err);
        }
    )
};