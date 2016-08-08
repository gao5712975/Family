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
        console.info(config.access_token);
        getAccessToken((data) => {
            if(data){
                config.access_token = JSON.parse(data).access_token;
            }
        });
    },60*1000*2);
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

//消息回复类型
let switchMasType = {
    text:msgTypeText,
    image:msgTypeImage,
    voice:msgTypeVoice,
    shortvideo:msgTypeVideo,
    video:msgTypeVideo,
    music:'',
    news:''
};

exports.forwardNews = function (req, res) {
    let xml = '';
    req.on('data',(data) => {
        xml += data
    });
    req.once('end',() => {
        console.info(xml);
        xml2js.parseString(xml,{explicitArray:false},(err,result) => {
            if(err){
                res.send({code:500,msg:err})
            } else{
                console.info(result);
                let msgType = (typeof switchMasType[result.xml.MsgType] == 'function') && switchMasType[result.xml.MsgType](result,function (data) {
                    console.info(data);
                    res.send(data);
                });
                console.info(msgType);
                if(!msgType){
                    res.send('success');
                }
            }
        })
    });
};

function msgTypeText(result,done) {
    let builder = new xml2js.Builder({rootName:'xml',xmldec:{},cdata:true,headless:true});
    let FromUserName = result.xml.FromUserName;
    result.xml.FromUserName = result.xml.ToUserName;
    result.xml.ToUserName = FromUserName;
    let xmlBuffer = builder.buildObject(result.xml);
    done && done(xmlBuffer);
    return true;
}

function msgTypeImage(result,done) {
    let builder = new xml2js.Builder({rootName:'xml',xmldec:{},cdata:true,headless:true});
    let FromUserName = result.xml.FromUserName;
    result.xml.FromUserName = result.xml.ToUserName;
    result.xml.ToUserName = FromUserName;
    result.xml.Image = {
        MediaId:result.xml.MediaId
    };
    let xmlBuffer = builder.buildObject(result.xml);
    done && done(xmlBuffer);
    return true;
}

function msgTypeVoice(result,done) {
    let builder = new xml2js.Builder({rootName:'xml',xmldec:{},cdata:true,headless:true});
    let FromUserName = result.xml.FromUserName;
    result.xml.FromUserName = result.xml.ToUserName;
    result.xml.ToUserName = FromUserName;
    result.xml.Voice = {
        MediaId:result.xml.MediaId
    };
    let xmlBuffer = builder.buildObject(result.xml);
    done && done(xmlBuffer);
    return true;
}

function msgTypeVideo(result,done) {
    let builder = new xml2js.Builder({rootName:'xml',xmldec:{},cdata:true,headless:true});
    let FromUserName = result.xml.FromUserName;
    result.xml.FromUserName = result.xml.ToUserName;
    result.xml.ToUserName = FromUserName;
    result.xml.MsgType = 'video';
    result.xml.Video = {
        MediaId:result.xml.MediaId,
        Title:'测试',
        Description:'测试测试测试，重要的事情需要说三遍'
    };
    let xmlBuffer = builder.buildObject(result.xml);
    done && done(xmlBuffer);
    return true;
}
