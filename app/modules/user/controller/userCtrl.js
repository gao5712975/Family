/**
 * Created by Yuan on 2016/7/17.
 */
'use strict';
var mongoose = require("mongoose");
var User = mongoose.model('User');
var UserDetail = mongoose.model('UserDetail');
var Page = require('../../base/page');

exports.findList = function (req, res) {
    Page(req.body.pageIndex,req.body.pageSize,User,{},(err,doc) => {
        if(err) res.send({code:500,msg:err});
        res.send({code:200,doc:doc});
    })
};

exports.findById = function (req, res) {
    User.findOne(req.body._id).then(
        (doc) =>{
            res.send({code:200,doc:doc});
        },
        (err) =>{
            res.statusCode = 500;
            res.send({code:500,msg:err});
        }
    )
};

exports.findUsersById = function (req, res) {
    User.findUsersById(req.body._id).then(
        (doc) =>{
            res.send({code:200,doc:doc});
        },
        (err) =>{
            res.statusCode = 500;
            res.send({code:500,msg:err});
        }
    )
};

exports.saveEntity = function (req, res) {
    var _id = new mongoose.Types.ObjectId;
    req.body.userDetailId = _id;
    var user = new User(req.body);
    user.save().then(
        (doc) =>{
            var userDetails = new UserDetail({_id:_id,userId:doc._id});
            userDetails.save().then();
            res.send({code:200,doc:doc});
        },
        (err) =>{
            res.statusCode = 500;
            res.send({code:500,msg:err});
        }
    );
};

exports.updatePassword = function (req, res) {
    User.updatePassword(req.body).then(
        (doc) =>{
            res.send({code:200,doc:doc});
        },
        (err) =>{
            res.statusCode = 500;
            res.send({code:500,msg:err});
        }
    )
};

exports.removeEntityById = function (req, res) {
    User.remove({_id:req.body._id}).then(
        (doc) =>{
            res.send({code:200,doc:doc});
            removeUserDetail(req.body._id);
        },
        (err) =>{
            res.statusCode = 500;
            res.send({code:500,msg:err});
        }
    );
    function removeUserDetail(id) {
        UserDetail.remove({userId:id}).then();
    }
};