/**
 * Created by Yuan on 2016/7/17.
 */
'use strict';
var mongoose = require("mongoose");
var User = mongoose.model('User');
var UserDetail = mongoose.model('UserDetail');

exports.findById = function (req, res) {
    User.findById(req.body._id).then(
        function (doc) {
            res.send(doc);
        },
        function (err) {
            res.statusCode = 500;
            res.send(err);
        }
    )
};

exports.findUsersById = function (req, res) {
    User.findUsersById(req.body._id).then(
        function (doc) {
            res.send(doc);
        },
        function (err) {
            res.statusCode = 500;
            res.send(err);
        }
    )
};

exports.saveEntity = function (req, res) {
    var _id = new mongoose.Types.ObjectId;
    req.body.userDetailId = _id;
    console.info(req.body);
    var user = new User(req.body);
    user.save().then(
        function (doc) {
            var userDetails = new UserDetail({_id:_id,userId:doc._id});
            userDetails.save().then(
                function (doc) {
                    res.json(doc);
                }
            );
        },
        function (err) {
            res.statusCode = 500;
            res.send(err);
        }
    );
};

exports.updateEntity = function (req, res) {
    User.updateEntity(req.body).then(
        function (doc) {
            res.send(doc);
        },
        function (err) {
            res.statusCode = 500;
            res.send(err);
        }
    )
};

exports.removeEntityById = function (req, res) {
    User.remove({_id:req.body._id}).then(
        function (doc) {
            res.send(doc);
            removeUserDetail(req.body._id);
        },function (err) {
            res.statusCode = 500;
            res.send(err);
        }
    );
    function removeUserDetail(id) {
        UserDetail.remove({userId:id}).then();
    }
};