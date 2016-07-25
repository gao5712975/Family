/**
 * Created by Yuan on 2016/7/19.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanySchema = new Schema({
    name:{
        type:String
    },
    rul:{
        type:String
    }
});

module.exports = function (db) {
    db.model('Company', CompanySchema,'Company');
};