/**
 * Created by Yuan on 2016/7/17.
 */
"use strict";
var UserDetail = require("../controller/userDetailCtrl");

var namespace = '/userDetail';

module.exports = function (app) {
    app.post(namespace + "/findList.htm",UserDetail.findList);
    app.post(namespace + "/findById.htm",UserDetail.findById);
};