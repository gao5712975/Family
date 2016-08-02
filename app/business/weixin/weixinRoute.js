/**
 * Created by Yuan on 2016/7/17.
 */
'use strict';
let express = require('express');
let weixinCtrl = require('./weixinCtrl');
let config = require('../config');

module.exports = function (app) {
    let route = express.Router();
    //接口验证
    route.get('/',weixinCtrl.portVerified);
    //消息转接
    route.post('/',weixinCtrl.forwardNews);

    app.use(route)
};