/**
 * Created by Yuan on 2016/7/19.
 */
'use strict';
var agency = require('../controller/agencyCtrl');

module.exports = function (app) {
    app.post("/saveAgencyEntity.htm",agency.saveAgencyEntity);
    app.post("/findAgencyNextAll.htm",agency.findAgencyNextAll);
};