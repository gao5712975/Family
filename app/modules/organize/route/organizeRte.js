/**
 * Created by Yuan on 2016/7/19.
 */
'use strict';
var organize = require('../controller/organizeCtrl');

var namespace = '/organize';

module.exports = function (app) {
    app.post(namespace + "/findList.htm",organize.findList);
    app.post(namespace + "/findById.htm",organize.findById);
    app.post(namespace + "/saveEntity.htm",organize.saveEntity);
    app.post(namespace + "/findNextAllById.htm",organize.findNextAllById);
};