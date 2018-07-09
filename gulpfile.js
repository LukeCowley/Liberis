const gulp = require('gulp');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');

gulp.task('build', () => {
  return gulp.src('src/**/*.ts')
    .pipe(ts({
        noImplicitAny: true,
        outFile: 'bca-eligibility.js'
    }))
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);