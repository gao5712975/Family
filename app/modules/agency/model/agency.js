/**
 * Created by Yuan on 2016/7/19.
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
    parentId: {
        type: Schema.Types.ObjectId,
        ref: 'Agency'
    }
});

AgencySchema.statics.findAgencyNextAll = function (id) {
    return this.find({_id:id})
        .populate('Agency').exec();
};

module.exports = function (db) {
    db.model('Agency', AgencySchema,'Agency');
};