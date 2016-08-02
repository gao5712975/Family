/**
 * Created by Yuan on 2016/8/1.
 */
'use strict';
let crypto = require('crypto');
let config = require('../config');
let https = require('https');
let xml2js = require('xml2js');

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
    // getAccessToken((data) => {
    //     if(data){
    //         config.access_token = JSON.parse(data).access_token;
    //     }
    // });
    setInterval(function () {
        getAccessToken((data) => {
            if(data){
                config.access_token = JSON.parse(data).access_token;
            }
        });
    },60*1000*200);
}();

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

exports.forwardNews = function (req, res) {
    let xml = '';
    req.on('data',(data) => {
        xml += data
    });
    req.once('end',() => {
        console.info(xml);
        xml2js.parseString(xml,{explicitArray:false},(err,result) => {
            console.info(JSON.stringify(result));
            let builder = new xml2js.Builder({rootName:'xml',xmldec:{},cdata:false,headless:true});
            let FromUserName = result.xml.FromUserName;
            result.xml.FromUserName = result.xml.ToUserName;
            result.xml.ToUserName = FromUserName;
            let xmlBuffer = builder.buildObject(result.xml);
            console.info(xmlBuffer);
            res.send(xmlBuffer);
        })
    });
};

