/**
 * Created by Yuan on 2016/7/17.
 */
'use strict';
let express = require('express');
let weixinCtrl = require('../controller/weixinCtrl');
let weixinPort = require('../controller/weixinPort');
let config = require('../../config');

let namespace = '/weixin';

module.exports = function (app) {
    let route = express.Router();
    //接口验证
    route.get(namespace,weixinPort.portVerified);
    //消息转接
    route.post(namespace,weixinPort.forwardNews);
    //保存微信菜单
    route.post(namespace + '/saveMenuEntity.htm',weixinCtrl.saveMenuEntity);
    //发布微信菜单
    route.get(namespace + '/releaseMenu.htm',weixinCtrl.releaseMenu);
    
    app.use(route)
};