/**
 * Created by Yuan on 2016/8/1.
 */
'use strict';
let https = require('https');
let url = require('url')
let querystring = require('querystring');
let mongoose = require("mongoose");
let WxMenu = mongoose.model('WxMenu');
let async = require('async');
let config = require('../../config');
let _ = require('lodash');

/**
 * 微信菜单的保存
 * @param req
 * @param res
 */
exports.saveMenuEntity = function (req, res) {
    let wxMenu = new WxMenu(req.body);
    if(req.body.parentId){
        async.waterfall([
            function (done) {
                WxMenu.findOne({_id:req.body.parentId}).then(
                    (doc) => {
                        done(null,doc);
                    },
                    (err) => {
                        done(err);
                    }
                )
            },
            function (doc, done) {
                if(doc && doc.countMenu < 5){
                    wxMenu.save().then(
                        (doc) =>{
                            done(null,doc);
                        },
                        (err) => {
                            done(err);
                        }
                    );
                }else{
                    if(!doc)
                        done('没有数据');
                    else
                        done('超过最大子菜单数量');
                }
            },
            function (doc, done) {
                WxMenu.findOneAndUpdate({_id:req.body.parentId},{$inc:{countMenu:1}}).then(
                    () => {
                        done(null,doc);
                    },
                    (err) => {
                        done(err);
                    }
                )
            }
        ],(err,result) => {
            if(err){
                res.statusCode = 500;
                res.send({code:500,msg:err});
            }else{
                res.send({code:200,doc:result});
            }
        });
    }else{
        async.waterfall([
            function (done) {
                WxMenu.find({parentId:null}).then(
                    (doc) => {
                        done(null,doc)
                    },
                    (err) => {
                        done(err)
                    }
                )
            },
            function (doc, done) {
                if(doc && doc.length < 3){
                    wxMenu.save().then(
                        (doc) => {
                            done(null,doc);
                        },
                        (err) => {
                            done(err);
                        }
                    )
                }else{
                    done('超过最大菜单数量')
                }
            }
        ],function (err, result) {
            if(err){
                res.statusCode = 500;
                res.send({code:500,msg:err});
            }else{
                res.send({code:200,doc:result});
            }
        })
    }
};

exports.releaseMenu = function (req, res) {
    async.waterfall([
        function (done) {
            WxMenu.find({parentId:null},{_id:0,__v:0,countMenu:0,type:0,click:0,key:0}).then(
                (doc) => {
                    done(null,doc);
                },
                (err) => {
                    done(err);
                }
            )
        },
        function (data, done) {
            if(data && data.length > 0){
                let array = [];
                data.forEach((obj) => {
                    array.push(WxMenu.find({parentId:obj._id},{_id:0,__v:0,countMenu:0}))
                });
                Promise.all(array).then(
                    (doc) => {
                        done(null,data,doc)
                    },
                    (err) => {
                        done(err)
                    }
                );
            }
        }
    ],(err,data,result) => {
        if(err){
            res.statusCode = 500;
            res.send({code:500,msg:err});
        }else{
            for(let i = 0,j = data.length;i < j; i++){
                let ob = data[i];
                ob.set('sub_button',result[i],{strict:false});
            }

            process.stdout.write(JSON.stringify(data));
            let post_data = JSON.stringify({"button":data})// querystring.stringify({"button":data})// JSON.stringify();

            let _url = `https://${config.url}/cgi-bin/menu/create?access_token=${config.access_token}`;
            console.info(_url);
            let options = url.parse(_url);
            options.headers = {
                'Content-Type': 'application/json',
                'Content-Length': post_data.length
            };
            options.method = 'POST';

/*            var options = {
                hostname: `${config.url}`,
                port: 80,
                path: `/cgi-bin/menu/create?access_token=${config.access_token}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': post_data.length
                }
            };*/

            let value = '';
            let req = https.request(options,(_res) => {
                _res.on('data', (d) => {
                    value += d;
                });
                _res.on('end',() => {
                    res.send({code:200,doc:value,data:JSON.stringify(data)});
                })
            });
            req.on('error', (err) => {
                res.statusCode = 500;
                res.send({code:500,msg:err});
            });
            req.write(post_data);
            req.end();
        }
    })
};
