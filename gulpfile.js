var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var react = require('gulp-react');
var sourcemaps = require('gulp-sourcemaps');
var webserver = require('gulp-webserver');

var browserify = require('browserify');

var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

gulp.task('jsx', function () {
    return gulp.src('jsx/**/*.jsx')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(react())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('js'));
});

gulp.task('scripts', ['jsx'], function () {
    return browserify({
        entries: ['js/index.js'],
        debug: true
    })
    .bundle()
    .on('error', function (error) {
        console.dir(error);
        this.emit('end');
    })
    //.pipe(plumber())
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('.'));
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
            livereload: true,
            directoryListening: true,
            open: true
        }));
});

gulp.task('ww', ['watch', 'webserver']);

gulp.task('default', ['scripts', 'styles']);
