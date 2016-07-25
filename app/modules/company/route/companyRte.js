/**
 * Created by Yuan on 2016/7/19.
 */
'use strict';
var role = require('../controller/companyCtrl');

var namespace = '/company';

module.exports = function (app) {
    app.post(namespace + "/saveEntity.htm",role.saveEntity)
};