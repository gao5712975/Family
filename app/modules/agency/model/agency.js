/**
 * Created by Yuan on 2016/7/19.
 * 机构
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AgencySchema = new Schema({
    name:{
        type:String
    },
    agencyNumber:{
        type:String
    },
    parentId: Schema.Types.ObjectId,
    parentList:Array
});

module.exports = function (db) {
    db.model('Agency', AgencySchema,'Agency');
};
