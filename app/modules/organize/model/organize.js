/**
 * Created by Yuan on 2016/7/19.
 * 机构
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrganizeSchema = new Schema({
    name:{
        type:String
    },
    sort:{
        type:Number  
    },
    parentId: Schema.Types.ObjectId,
    parentList:Array
});

module.exports = function (db) {
    db.model('Organize', OrganizeSchema,'Organize');
};
