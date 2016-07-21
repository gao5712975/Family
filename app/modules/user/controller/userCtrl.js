/**
 * Created by Yuan on 2016/7/17.
 */
'use strict';
var mongoose = require("mongoose");
var User = mongoose.model('User');
var UserDetail = mongoose.model('UserDetail');

exports.findEntityById = function (req, res) {
    User.findEntityById(req.body._id).then(
        function (doc) {
            res.send(doc);
        },
        function (err) {
            console.info(err);
        }
    )
};

exports.findUsersById = function (req, res) {
    User.findUsersById(req.body._id).then(
        function (doc) {
            res.send(doc);
        },
        function (err) {
            console.info(err);
        }
    )
};

exports.saveUserEntity = function (req, res) {
    var _id = new mongoose.Types.ObjectId;
    req.body._userDetailId = _id;
    var user = new User(req.body);
    user.save().then(
        function (doc) {
            saveUserDetail({_id:_id,_userId:doc._id});
            console.info(doc);
            res.send({status: 200});
        },
        function (err) {
            res.send({status: 500,msg:err});
            console.info(err);
        }
    );
    
    function saveUserDetail(body) {
        var UserDetails = new UserDetail(body);
        UserDetails.save().then(
            function (doc) {
                console.info(doc)
            },
            function (err) {
                console.info(err);
            }
        )
    }
};

exports.updateEntity = function (req, res) {
    User.updateEntity(req.body).then(
        function (doc) {
            res.send(doc);
        },
        function (err) {
            console.info(err);
        }
    )
};