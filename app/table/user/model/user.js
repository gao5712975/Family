/**
 * Created by Yuan on 2016/7/17.
 */
'use strict';
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Promise = mongoose.Promise;
var UserSchema = new Schema({
    user: String,
    password: String,
    create_time: {type: Date, default: new Date()},
    update_time: {type: Date, default: new Date()}
});

var User = mongoose.model('User', UserSchema);

UserSchema.statics.findById = function (id) {
    return this.find({'_id':id}).exec();
};

UserSchema.pre('save',function (error, data) {
    return new Promise.ES6(function(resolve, reject){
        if(error){
            reject(error);
        }else{
            resolve(data);
        }
    });
});

module.exports = User;