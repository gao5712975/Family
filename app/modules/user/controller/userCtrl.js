/**
 * Created by Yuan on 2016/7/17.
 */
'use strict';
var mongoose = require("mongoose");
var User = mongoose.model('User');
var UserDetail = mongoose.model('UserDetail');

exports.findUserEntityById = function (req, res) {
    User.findById(req.body).then(
        function (doc) {
            console.info(doc);
            res.send(doc);
        },
        function (err) {
            console.info(err);
        }
    )
};

exports.saveUserEntity = function (req, res) {
    var user = new User(req.body);
    var promise = user.save();
    promise.then(
        function (doc) {
            saveUserDetail({_userId:doc._id});
            console.info(doc);
            res.send({status: 200});
        },
        function (err) {
            console.info(err);
        }
    )
    
    function saveUserDetail(body) {
        var UserDetails = new UserDetail(body);
        var $q = UserDetails.save();
        $q.then(
            function (doc) {
                console.info(doc)
            },
            function (err) {
                console.info(err);
            }
        )
    }
}