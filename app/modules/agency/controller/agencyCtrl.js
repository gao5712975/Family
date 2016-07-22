/**
 * Created by Yuan on 2016/7/19.
 */
'use strict';
var mongoose = require("mongoose");
var Agency = mongoose.model('Agency');

exports.saveEntity = function (req, res) {
    var agency = new Agency(req.body);
    agency.save(req.body).then(
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
    Agency.find({_id:req.body._id}).then(
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
    Agency.find({_id:req.body._id}).then(
        function (doc) {
            doc[0].parentList = [];
            asd(doc[0]);
            res.json(doc[0]);
        },
        function (err) {
            res.statusCode = 500;
            res.send(err);
        }
    );

    function asd(_obj) {
        Agency.find({parentId:_obj._id}).then(
            function (doc) {
                if(doc && doc.length > 0){
                    _obj.parentList = doc;
                    asdf(_obj.parentList,[]);
                    
                }else{
                    res.send(_obj)
                }
            }
        );
        function asdf(array,arr) {
            array.forEach(function (obj) {
                !function (obj) {
                    arr.push(Agency.find({parentId:obj._id}));
                }(obj)
            })
        }
        // Agency.find({parentId:obj._id}).then(
        //     function (doc) {
        //         if(doc && doc.length > 0){
        //             obj.parentList = doc;
        //             asdf(obj.parentList)
        //         }
        //     }
        // )
        
    }
};