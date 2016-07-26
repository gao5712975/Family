/**
 * Created by Yuan on 2016/7/19.
 */
'use strict';
var auth = require('../controller/authCtrl');

var namespace = '/auth';

module.exports = function (app) {
    app.post(namespace + "/findList.htm",auth.findList);
    app.post(namespace + "/saveEntity.htm",auth.saveEntity)
};