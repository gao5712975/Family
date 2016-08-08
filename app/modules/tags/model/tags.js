/**
 * Created by Yuan on 2016/7/19.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagsSchema = new Schema({
    name:{
        type:String
    }
});

module.exports = function (db) {
    db.model('Tags', TagsSchema,'Tags');
};