/**
 * Created by Yuan on 2016/7/19.
 */
'use strict';
var mongoose = require("mongoose");
var Agency = mongoose.model('Agency');

exports.saveAgencyEntity = function (req, res) {
    var agency = new Agency(req.body);
    agency.save(req.body).then(
        function (doc) {
            res.send(doc);
        },
        function (err) {
            console.info(err);
        }
    )
};

exports.findAgencyNextAll = function (req, res) {
    Agency.findAgencyNextAll(req.body._id).then(
        function (doc) {
            res.send(doc);
        },
        function (err) {
            console.info(err);
        }
    )
};