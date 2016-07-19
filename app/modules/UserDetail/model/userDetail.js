/**
 * Created by Yuan on 2016/7/17.
 */
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserDetailSchema = new Schema({
    _userId:Schema.Types.ObjectId,
    valid:{type:Number,default:0},
    sort:Number,
    create_time: {type: Date, default: new Date()},
    update_time: {type: Date, default: new Date()}
});


UserDetailSchema.statics.findById = function (id) {
    return this.find({'_id':id}).exec();
};

module.exports = function (db) {
    db.model('UserDetail', UserDetailSchema);
};