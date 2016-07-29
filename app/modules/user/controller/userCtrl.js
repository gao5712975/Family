/**
 * Created by Yuan on 2016/7/17.
 */
'use strict';
let mongoose = require("mongoose");
let User = mongoose.model('User');
let UserDetail = mongoose.model('UserDetail');
var Role = mongoose.model('Role');
let Page = require('../../base/page');
let Redis = require('../../base/redis');
let Config = require('../../../config/config');

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
                    var _session = {user:arr[0], authList:arr[1]};
                    /**
                     * 如果有session管理登陆 否则用redis保存用户登陆信息
                     */
                    if(req.session){
                        req.session.userSession = _session;
                        res.send({code:200,doc:doc});
                    }else{
                        Redis( (client) => {
                            client.set(`${doc._id}`,JSON.stringify(_session));
                            client.expire(`${doc._id}`, Config.sessionTtl);
                            client.quit();
                            res.send({code:200,doc:doc});
                        });
                    }
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
    if(req.session){
        req.session.destroy();
        res.send({code:200});
    }else{
        let token = req.get('express-token-key');
        Redis( (client) => {
            client.expire(`${token}`, 0);
            client.quit();
            res.send({code:200});
        });
    }
};