/**
 * Created by Yuan on 2016/7/19.
 */
'use strict';
var role = require('../controller/roleCtrl');

module.exports = function (app) {
    app.post("/saveRoleEntity.htm",role.saveRoleEntity)
};