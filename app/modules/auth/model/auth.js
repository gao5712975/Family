/**
 * Created by Yuan on 2016/7/19.
 * 权限
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AuthSchema = new Schema({
    name:{
        type:String
    },
    marking:{
        type:String
    },
    type:{
        type:String,
        enum:[0,1]
    }
});

module.exports = function (db) {
    db.model('Auth', AuthSchema,'Auth');
};