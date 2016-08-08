/**
 * Created by Yuan on 2016/7/19.
 */
'use strict';
var mongoose = require("mongoose");
var Tags = mongoose.model('Tags');

exports.saveEntity = function (req, res) {
    var role = new Tags(req.body);
    role.save(req.body).then(
        (doc) =>{
            res.send({code:200,doc:doc});
        },
        (err) =>{
            res.statusCode = 500;
            res.send({code:500,msg:err});
        }
    )
};