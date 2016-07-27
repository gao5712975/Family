/**
 * Created by Yuan on 2016/7/27.
 */
"use strict";
var multer = require('multer');
var fs = require('fs');

var storage = multer.diskStorage({
    'destination': function (req, file, cb) {
        fs.exists('uploads/', (exists) => {
            if (!exists) fs.mkdirSync('uploads/');
            cb(null, 'uploads/')
        });
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({
    storage: storage,
    limits:{

    },
    'fileFilter': function (req, file, cb) {
        console.info(req.files);
        console.info(file);
        cb(null,true)
    }
});

module.exports = function (app) {
    app.post('/load/profile.htm', upload.any(), function (req, res, next) {
        res.send({code: 200, doc: req.files})
    })
};
