/**
 * Created by Yuan on 2016/7/19.
 */
'use strict';
var role = require('../controller/roleCtrl');

var namespace = '/role';

module.exports = function (app) {
    app.get(namespace + "/findAll.htm",role.findAll);
    app.post(namespace + "/findList.htm",role.findList);
    app.post(namespace + "/saveEntity.htm",role.saveEntity);
    app.post(namespace + "/findById.htm",role.findById);
    app.post(namespace + "/findAllAuthById.htm",role.findAllAuthById);
};