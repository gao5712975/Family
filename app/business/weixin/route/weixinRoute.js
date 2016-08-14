/**
 * Created by Yuan on 2016/7/17.
 */
'use strict';
let express = require('express');
let wxMenuCtrl = require('../controller/wxMenuCtrl');
let wxNewsCtrl = require('../controller/wxNewsCtrl');
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
    route.post(namespace + '/saveMenuEntity.htm',wxMenuCtrl.saveMenuEntity);
    //发布微信菜单
    route.get(namespace + '/releaseMenu.htm',wxMenuCtrl.releaseMenu);
    //保存图文
    route.post(namespace + '/saveNewsEntity.htm',wxNewsCtrl.saveNewsEntity);
    //图文列表
    route.post(namespace + "/findList.htm",wxNewsCtrl.findList);
    //图文
    route.post(namespace + "/findById.htm",wxNewsCtrl.findById);
    
    app.use(route)
};