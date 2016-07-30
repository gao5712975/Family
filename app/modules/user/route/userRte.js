/**
 * Created by Yuan on 2016/7/17.
 */
"use strict";
var User = require("../controller/userCtrl");

var namespace = '/user';

module.exports = function (app) {
    app.post(namespace + "/login.htm",User.login);
    app.get(namespace + "/loginOut.htm",User.loginOut);
    app.post(namespace + "/findList.htm",User.findList);
    app.post(namespace + "/findById.htm",User.findById);
    app.post(namespace + "/findUsersById.htm",User.findUsersById);
    app.post(namespace + "/updatePassword.htm",User.updatePassword);
    app.post(namespace + "/saveEntity.htm",User.saveEntity);
    app.post(namespace + "/removeEntityById.htm",User.removeEntityById);
};