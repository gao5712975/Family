/**
 * Created by Yuan on 2016/7/17.
 */
'use strict';
let mongoose = require("mongoose");
let User = mongoose.model('User');
let UserDetail = mongoose.model('UserDetail');
var Role = mongoose.model('Role');
let Page = require('../../base/page');

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
    User.find({user:req.body.user}).then(
        (doc) => {
            if(doc) res.send({code:500,doc:doc});
            addUser();
        }
    );
    function addUser() {
        let _id = new mongoose.Types.ObjectId;
        req.body.userDetailId = _id;
        let user = new User(req.body);
        user.save().then(
            (doc) =>{
                let userDetails = new UserDetail({_id:_id,userId:doc._id});
                userDetails.save().then();
                res.send({code:200,doc:doc});
            },
            (err) =>{
                res.statusCode = 500;
                res.send({code:500,msg:err});
            }
        );
    }
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

exports.login = function (req, res) {
    User.findOne({user:req.body.user,password:req.body.password}).then(
        (doc) => {
            if(!doc) res.send({code:404});
            res.set('express-token-key',doc._id);
            let $user = User.findUsersById({_id:doc._id});
            let $role = Role.findAllAuthById({_id:doc.roleId});
            Promise.all([$user,$role]).then(
                (arr) => {
                    req.session.userSession = {
                        user:arr[0],
                        authList:arr[1]
                    };
                    res.send({code:200,doc:doc});
                }
            );
        },
        (err) =>{
            res.statusCode = 500;
            res.send({code:500,msg:err});
        }
    )
};

exports.loginOut = function (req, res) {
    if(req.session.userSession){
        delete req.session.userSession;
    }
    res.send({code:200});
};