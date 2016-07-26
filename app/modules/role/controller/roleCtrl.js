/**
 * Created by Yuan on 2016/7/19.
 */
'use strict';
var mongoose = require("mongoose");
var Role = mongoose.model('Role');

exports.saveEntity = function (req, res) {
    var role = new Role(req.body);
    role.save(req.body).then(
        (doc) =>{
            res.send(doc);
        },
        (err) =>{
            res.statusCode = 500;
            res.send(err);
        }
    )
};

exports.findById = function (req, res) {
    Role.findById(req.body._id).then(
        (doc) =>{
            res.send(doc);
        },
        (err) =>{
            res.statusCode = 500;
            res.send(err);
        }
    )
};

exports.findAllAuthById = function (req, res) {
    Role.findAllAuthById(req.body._id).then(
        (doc) =>{
            res.send(doc);
        },
        (err) =>{
            res.statusCode = 500;
            res.send(err);
        }
    )
};