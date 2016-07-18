/**
 * Created by Yuan on 2016/7/17.
 */
"use strict";
var User = require("../controller/userCtrl");

module.exports = function (app) {
    app.post("/findUserEntityById.htm",User.findUserEntityById);
    app.post("/saveUserEntity.htm",User.saveUserEntity);
}