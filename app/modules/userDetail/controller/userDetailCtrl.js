/**
 * Created by Yuan on 2016/7/17.
 */
'use strict';
var mongoose = require("mongoose");
var UserDetail = mongoose.model('UserDetail');

exports.findById = function (req, res) {
    UserDetail.findById(req.body).then(
        function (data) {
            res.send(data);
        },
        function (err) {
            res.statusCode = 500;
            res.send(err);
        }
    )
};