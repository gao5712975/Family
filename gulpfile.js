/**
 * Created by Yuan on 2016/7/16.
 */
var gulp = require('gulp');
var del = require('del'); //文件删除
var runSequence = require('run-sequence'); //异步任务
var gulpWatch = require('gulp-watch'); //监听插件
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');
var gulpConcat = require('gulp-concat');

gulp.task('default', function () {
    nodemon({
        script: 'server.js',
        ignore:[
            'public/**', 
            'test/**',
            'gulpfile.js',
            'webApp',
            'www',
            'node_modules'
        ]
    }).on('restart', function () {
        console.log('restarted!')
    });

    gulp.start('watch');
});

gulp.task('watch',function () {
    runSequence(['build'],function () {
        gulpWatch(['webApp/**'],function () {
            gulp.start('build');
        })
    })
});

gulp.task('clean', function(){
    return del('www/src');
});

gulp.task('build',['clean'],function () {
    return gulp.src('webApp/**')
        .pipe(gulp.dest('www/src/'))
});
