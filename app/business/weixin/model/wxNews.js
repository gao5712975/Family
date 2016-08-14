/**
 * 图文
 * Created by moka on 2016/8/13.
 */
'use strict';
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let WxNewsSchema = new Schema({
    articles:[
        {
            title:{
                type:String
            },
            description:{
                type:String
            },
            picUrl:{
                type:String
            },
            url:{
                type:String
            }
        }
    ]
});

module.exports = function (db) {
    db.model('WxNews', WxNewsSchema,'WxNews');
};