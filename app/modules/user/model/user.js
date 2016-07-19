/**
 * Created by Yuan on 2016/7/17.
 */
'use strict';
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    user: {type:String,required:[true, '请填写用户名']},
    password: {type:String,required:[true, '请填写用户名']},
    valid:{type:Number,default:0},
    sort:Number,
    create_time: {type: Date, default: new Date()},
    update_time: {type: Date, default: new Date()}
});

UserSchema.statics.findById = function (id) {
    return this.find({'_id':id}).exec();
};

module.exports = function (db) {
    db.model('User', UserSchema,'User');
};