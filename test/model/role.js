/**
 * Created by Yuan on 2016/7/19.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoleSchema = new Schema({
    name:{
        type:String
    },
    authList:Array
});

module.exports = function (db) {
    db.model('Role', RoleSchema,'Role');
};