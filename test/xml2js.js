/**
 * Created by moka on 16-8-2.
 */
var xml2js = require('xml2js');
var s = '{"ToUserName":"gh_47768759054a","FromUserName":"og34EwFyCoTxItVZkIxq-Bi78QuI","CreateTime":"1470119777","MsgType":"text","Content":"收拾收拾","MsgId":"6314116363937716695"}'
var builder = new xml2js.Builder({rootName:'xml',xmldec:{},cdata:false,headless:true});
var xml = builder.buildObject(JSON.parse(s));
console.info(xml);