/**
 * Created by Yuan on 2016/7/19.
 * 角色
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoleSchema = new Schema({
    name:{
        type:String
    },
    authList:[
        {
            type:Schema.Types.ObjectId,
            ref:'Auth'
        }
    ]
});

RoleSchema.statics.findAllAuthById = function (id) {
    return this.find({_id:id})
        .populate('authList').exec();
};

RoleSchema.statics.findById = function (id) {
    return this.find({_id:id}).exec();
};

module.exports = function (db) {
    db.model('Role', RoleSchema,'Role');
};