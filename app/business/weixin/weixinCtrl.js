/**
 * Created by Yuan on 2016/8/1.
 */
'use strict';
let crypto = require('crypto');
let config = require('../config');
let https = require('https');
var schedule = require('node-schedule');//定时器

//接口验证
exports.portVerified = function (req, res) {
    let token = config.token;
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
};

function getAccessToken(done) {
    let url = `${config.url}/cgi-bin/token?grant_type=client_credential&appid=${config.appID}&secret=${config.appsecret}`;
    let data = '';
    let req = https.request(url,(res) => {
        res.on('data', (d) => {
            data += d;
        });
        res.on('end',() => {
            console.info(data);
            done(data);
        })
    });
    req.end();
    req.on('error', (e) => {
        console.error(e);
    });
}

!function () {
    getAccessToken((data) => {
        if(data){
            config.access_token = JSON.parse(data).access_token;
        }
    });
    setInterval(function () {
        getAccessToken((data) => {
            if(data){
                config.access_token = JSON.parse(data).access_token;
            }
        });
    },60*1000*2);
}();


