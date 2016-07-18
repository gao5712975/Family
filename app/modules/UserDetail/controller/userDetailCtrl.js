/**
 * Created by Yuan on 2016/7/17.
 */
'use strict';
var mongoose = require("mongoose");
var UserDetail = mongoose.model('UserDetail');

exports.findUserDetailEntityById = function (req, res) {
    UserDetail.findById(req.body).then(
        function (data) {
            res.send(data);
        },
        function (err) {
            console.info(err);
        }
    )
};