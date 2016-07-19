/**
 * Created by Yuan on 2016/7/17.
 */
"use strict";
var User = require("../controller/userCtrl");

module.exports = function (app) {
    app.post("/findUserEntityById.htm",User.findEntityById);
    app.post("/findUsersById.htm",User.findUsersById);
    app.post("/updateEntity.htm",User.updateEntity);
    app.post("/saveUserEntity.htm",User.saveUserEntity);
}