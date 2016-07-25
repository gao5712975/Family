/**
 * Created by Yuan on 2016/7/19.
 */
'use strict';
var mongoose = require("mongoose");
var Organize = mongoose.model('Organize');

exports.saveEntity = function (req, res) {
    var organize = new Organize(req.body);
    organize.save(req.body).then(
        function (doc) {
            res.send(doc);
        },
        function (err) {
            res.statusCode = 500;
            res.send(err);
        }
    )
};

exports.findById = function (req, res) {
    Organize.find({_id:req.body._id}).then(
        function (doc) {
            res.send(doc)
        },
        function (err) {
            res.statusCode = 500;
            res.send(err);
        }
    )
};

exports.findNextAllById = function (req, res) {
    Organize.findOne({_id:req.body._id}).then(
        function (doc) {
            Organize.find({parentId:doc._id}).then(
                function (arr) {
                    if(arr.length > 0){
                        doc.parentList = arr;
                        callback(doc,doc.parentList,0,function (data) {
                            res.json(data);
                        });
                    }else{
                        res.send(doc);
                    }
                }
            );
        },
        function (err) {
            res.statusCode = 500;
            res.send(err);
        }
    );

    /**
     * 获取子集所有的数据
     * @param doc
     * @param array
     * @param num
     * @param callback
     */
    function callback(doc,array,num,callback) {
        if(!num){
            num = 0;
        }
        var arr = [];
        array.forEach(function (data) {
            arr.push(Organize.find({parentId:data._id}));
        });
        Promise.all(arr).then(
            function (arr) {
                num += array.length;
                for(var i = 0,j = arr.length;i<j;i++){
                    var data = arr[i];
                    if(data.length > 0){
                        array[i].parentList = data;
                        callback(doc,array[i].parentList,--num,callback);
                    }else{
                        --num;
                        num == 0 && callback(doc);
                    }
                }
            }
        );
    }
};