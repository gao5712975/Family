/**
 * Created by Yuan on 2016/7/17.
 */
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.schema;
var UserDetilSchema = new Schema({

    _userId:String,
    valid:{type:Number,default:0},
    sort:Number,
    create_time: {type: Date, default: new Date()},
    update_time: {type: Date, default: new Date()}
});