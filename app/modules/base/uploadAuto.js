/**
 * Created by Yuan on 2016/7/27.
 */
"use strict";
var multer = require('multer');
var fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var _date = new Date();
        var _path = 'uploads/' + _date.getFullYear() + '/' + _date.getMonth() + '/' + _date.getDate();
        var _array = _path.split('/');
        
        var _p = '';
        _array.forEach((data) => {
            _p += data + '/';
            if(!fs.existsSync(_p)) fs.mkdirSync(_p);
        });
        cb(null, _path)
        
    },
    filename: function (req, file, cb) {
        file.filename = new Date().getTime() + '-' + file.originalname;
        cb(null, file.filename)
    }
});
var upload = multer({
    storage: storage,
    limits:{
        
    },
    fileFilter: function (req, file, cb) {
        cb(null,true)
    }
});

module.exports = function (app) {
    app.post('/load/profile.htm', upload.any(), function (req, res, next) {
        res.send({code: 200, doc: req.files})
    })
};
