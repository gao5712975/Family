/**
 * Created by Yuan on 2016/7/16.
 */
var gulp = require('gulp');
var del = require('del'); //文件删除
var runSequence = require('run-sequence'); //异步任务
var gulpWatch = require('gulp-watch'); //监听插件
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');

gulp.task('start', function () {
    nodemon({
        script: 'server.js'
    }).on('restart', function () {
        console.log('restarted!')
    })
})