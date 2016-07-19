/**
 * Created by Yuan on 2016/7/19.
 */
'use strict';
var auth = require('../controller/authCtrl');

module.exports = function (app) {
    app.post("/saveAuthEntity.htm",auth.saveAuthEntity)
};