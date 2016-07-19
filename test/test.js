/**
 * Created by Yuan on 2016/7/18.
 */
'use strict';
var mongoose = require("mongoose");
mongoose.set('debug', true);

var Schema = mongoose.Schema;
var TestSchema = new Schema({
    name:String,
    eggs: {
        type: Number,
        min: [6, 'Too few eggs'],
        max: 80
    },
    bacon: {
        type: Number,
        required: [true, 'Why no bacon?']
    },
    drink: {
        type: String,
        enum: ['Coffee', 'Tea' ,'Milk']
    },
    phone: {
        type: String,
        validate: {
            validator: function(v) {
                return /^(13[0-9]|15[0|1|3|6|7|8|9]|18[8|9])\d{8}$/.test(v);
            },
            message: '{VALUE} is not a valid phone number!'
        },
        required: [true, 'User phone number required']
    }
});

var db = mongoose.connect('mongodb://127.0.0.1/moka').connection;
db.on('disconnected', function () {
    console.info("ok")
});
var Test = db.model('TestSchema',TestSchema,'TestSchema');

var $qf = Test.find({})
    .select('drink phone eggs')
    .limit(10)
    .where('eggs').equals(40)
    .where('drink').in(['Coffee'])
    .exec();
$qf.then(
    function (doc) {
        console.info(doc)
    },
    function (err) {
        console.info(err)
    }
);


var LabelSchema = new Schema({
    name:String,
    testId:{
        type:Schema.Types.ObjectId,
        ref:'TestSchema'
    }
});

var Label = db.model('LabelSchema',LabelSchema,'LabelSchema');

Label.find({name:'1'})
    .populate('testId','name eggs').then(
    function (doc) {
        console.info(doc)
    },
    function (err) {
        console.info(err)
    }
);

//监听
TestSchema.post('save', function(doc) {
    console.log('%s has been saved', doc._id);
});
LabelSchema.post('save', function(doc) {
    console.log('%s has been saved', doc._id);
});

var test = new Test({
    name:'mengshi',
    eggs: 40,
    bacon: 0,
    drink: 'Coffee',
    phone:13770824611
});
var $q = test.save();

$q.then(
    function (doc) {
        // console.info(doc);
        var label = new Label({testId:doc._id,name:'关联查询测试'});
        label.save().then(
            function (doc) {
                // console.info(doc)
            },
            function (err) {
                // console.info(err)
            }
        );
    },
    function (err) {
        // console.info(err)
    }
);





