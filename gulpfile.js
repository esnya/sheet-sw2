var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var reactify = require('reactify');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var util = require('gulp-util');
var webserver = require('gulp-webserver');

var browserify = require('browserify');

var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var notifier = require('node-notifier');

var onError = function (error) {
    notifier.notify({
        message: error.message,
        title: error.plugin,
        sound: 'Glass'
    });
};

var onSuccess = function (title) {
    notifier.notify({
        title: title,
        message: 'Done',
        sound: 'Glass'
    });
};


//gulp.task('jsx', function () {
//    return gulp.src('jsx/**/*.jsx')
//        .pipe(plumber())
//        //.pipe(sourcemaps.init())
//        .pipe(react())
//        //.pipe(sourcemaps.write('.'))
//        .pipe(gulp.dest('js'));
//});

gulp.task('_scripts', function () {
    return browserify({
        entries: ['jsx/index.jsx'],
        extensions: ['.jsx'],
        //debug: true,
        transform: [reactify]
    })
    .bundle()
    .on('error', function (error) {
        util.log(error);
        this.emit('end');
    })
    //.pipe(plumber())
    .pipe(source('bundle.js'))
    .pipe(buffer())
    //.pipe(sourcemaps.init({loadMaps: true}))
    //.pipe(uglify())
    //.on('error', util.log)
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('.'));
});

gulp.task('scripts', ['_scripts'], function () {
    onSuccess('scripts');
});

gulp.task('styles', function () {
    return gulp.src('less/**/*.less')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css'));
});

gulp.task('watch', function () {
    gulp.watch('jsx/**/*.jsx', ['scripts']);
    gulp.watch('less/**/*.less', ['styles']);
});

gulp.task('webserver', function () {
    gulp.src('.')
        .pipe(webserver({
            livereload: {
                enable: true,
                filter: function (file) {
                    return !file.match(/\.jsx$/);
                }
            },
            directoryListening: true,
            open: true
        }));
});

gulp.task('ww', ['watch', 'webserver']);

gulp.task('default', ['scripts', 'styles']);
