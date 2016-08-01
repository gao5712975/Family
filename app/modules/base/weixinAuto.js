/**
 * Created by Yuan on 2016/7/17.
 */
'use strict';
let express = require('express');
let crypto = require('crypto');

module.exports = function (app) {
    let route = express.Router();
    route.get('/',function (req, res) {
        let token = 'moka';
        let signature = req.query.signature;
        let timestamp = req.query.timestamp;
        let nonce = req.query.nonce;
        let echostr = req.query.echostr;

        console.info(req.query);

        let str = Array.of(token,timestamp,nonce).sort().join('');
        let sha1 = crypto.createHash('sha1');
        let sha1Str = sha1.update(str).digest('hex');

        if(sha1Str == signature){
            res.send(echostr);
        }else{
            res.send(false);
        }
    })
    app.use(route)
};