/**
 * Created by Yuan on 2016/7/19.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagsSchema = new Schema({
    tagId:{
        type:Schema.Types.ObjectId,
        ref:'Tags'
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
});

module.exports = function (db) {
    db.model('TagsUser', TagsSchema,'TagsUser');
};