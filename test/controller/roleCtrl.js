/**
 * Created by Yuan on 2016/7/19.
 */
'use strict';
var mongoose = require("mongoose");
var Role = mongoose.model('Role');

exports.saveRoleEntity = function (req, res) {
    var role = new Role(req.body);
    role.save(req.body).then(
        function (doc) {
            res.send(doc);
        },
        function (err) {
            console.info(err);
        }
    )
};