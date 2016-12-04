/**
 * Created by Yuan on 2016/7/19.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanySchema = new Schema({
    name: {
        type: String
    },
<<<<<<< HEAD
<<<<<<< HEAD
    rul:{
        type:String
    },
    create_time: {type: Date, default: new Date()},
    update_time: {type: Date, default: new Date()},
    state:{
        type:Number,
        enum:[0,1],
        default:0
=======
    rul: {
        type: String
>>>>>>> b0ece57ba5804a710060af70a478d2711f5fe03b
=======
    rul: {
        type: String
>>>>>>> b0ece57ba5804a710060af70a478d2711f5fe03b
    }
});

module.exports = function (db) {
    db.model('Company', CompanySchema, 'Company');
};