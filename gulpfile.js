var gulp = require('gulp');
var plumber = require('gulp-plumber');
var react = require('gulp-react');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('jsx', function () {
    return gulp.src('jsx/**/*.jsx')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(react())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('js'));
});

gulp.task('watch', function () {
    gulp.watch('jsx/**/*.jsx', ['jsx']);
});

gulp.task('default', ['jsx']);
