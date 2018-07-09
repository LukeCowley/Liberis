const gulp = require('gulp');
const ts = require('gulp-typescript');

gulp.task('build', () => {
  return gulp.src('src/**/*.ts')
    .pipe(ts({
        noImplicitAny: true,
        outFile: "bca-eligibility.js"
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);