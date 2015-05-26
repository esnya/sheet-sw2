var gulp = require('gulp');
var plumber = require('gulp-plumber');
var react = require('gulp-react');
var sourcemaps = require('gulp-sourcemaps');

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
    .pipe(plumber())
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('.'));
});

gulp.task('watch', function () {
    gulp.watch('jsx/**/*.jsx', ['scripts']);
});

gulp.task('default', ['scripts']);
