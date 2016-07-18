/**
 * Created by Yuan on 2016/7/17.
 */
"use strict";
var UserDetail = require("../controller/userDetailCtrl");

module.exports = function (app) {
    app.post("/findUserDetailEntityById.htm",UserDetail.findUserDetailEntityById);
};