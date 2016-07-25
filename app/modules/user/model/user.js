/**
 * Created by Yuan on 2016/7/17.
 * 用户
 */
'use strict';
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    user: {
        type:String,
        required:[true, '请填写用户名']
    },
    password: {
        type:String,
        required:[true, '请填写用户名']
    },
    userDetailId:{
        type:Schema.Types.ObjectId,
        ref:'UserDetail'
    },
    sectorId:{
        type:Schema.Types.ObjectId,
        ref:'Agency'
    },
    companyId:{
        type:Schema.Types.ObjectId,
        ref:'Company'
    },
    sectorName:String,
    companyName:String,
    valid:{
        type:Number,
        default:0
    },
    sort:Number,
    create_time: {type: Date, default: new Date()},
    update_time: {type: Date, default: new Date()}
});

UserSchema.statics.findById = function (id) {
    return this.find({_id:id}).exec();
};

UserSchema.statics.findUsersById = function (id) {
    return this.find({_id:id})
        .populate('userDetailId').exec();
};

UserSchema.statics.updateEntity = function (body) {
    return this.update({_id:body._id},{password:body.password}).exec();
};

module.exports = function (db) {
    db.model('User', UserSchema,'User');
};