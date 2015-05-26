var gulp = require('gulp');
var react = require('gulp-react');

gulp.task('jsx', function () {
    return gulp.src('jsx/**/*.jsx')
        .pipe(react())
        .pipe(gulp.dest('js'));
});

gulp.task('default', ['jsx']);
