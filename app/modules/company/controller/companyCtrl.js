/**
 * Created by Yuan on 2016/7/19.
 */
'use strict';
var mongoose = require("mongoose");
var Company = mongoose.model('Company');

exports.saveEntity = function (req, res) {
    var company = new Company(req.body);
    company.save(req.body).then(
        (doc) => {
            res.send(doc);
        },
        (err) =>{
            console.info(err);
        }
    )
};