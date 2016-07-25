/**
 * Created by Yuan on 2016/7/19.
 */
'use strict';
var agency = require('../controller/organizeCtrl');

var namespace = '/agency';

module.exports = function (app) {
    app.post(namespace + "/findById.htm",agency.findById);
    app.post(namespace + "/saveEntity.htm",agency.saveEntity);
    app.post(namespace + "/findNextAllById.htm",agency.findNextAllById);
};