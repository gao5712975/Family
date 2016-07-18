/**
 * Created by Yuan on 2016/7/17.
 */
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = mongoose.Promise;
var UserDetailSchema = new Schema({
    _userId:String,
    valid:{type:Number,default:0},
    sort:Number,
    create_time: {type: Date, default: new Date()},
    update_time: {type: Date, default: new Date()}
});


UserDetailSchema.statics.findById = function (id) {
    return this.find({'_id':id}).exec();
};

UserDetailSchema.pre('save',function (error, data) {
    return new Promise.ES6(function(resolve, reject){
        if(error){
            reject(error);
        }
        resolve(data);
    });
});

module.exports = function (db) {
    db.model('UserDetail', UserDetailSchema);
};