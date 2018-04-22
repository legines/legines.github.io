const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const useref = require('gulp-useref');
const minify = require("gulp-babel-minify");
const gulpIf = require('gulp-if');
const imagemin = require('gulp-imagemin');
const del = require('del');
const cache = require('gulp-cache');
const sequence = require('run-sequence');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const babel = require('gulp-babel');
const babelCore = require('gulp-core');
const cachebust = require('gulp-cache-bust');
const replace = require('gulp-replace');

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'IE 10-11',],
        cascade: false
      }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    })
  )
});

gulp.task('watch', ['browserSync', 'sass'], () => {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('browserSync', () =>
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
);

gulp.task('cssmin', () =>
  gulp.src('dist/css/main.min.css')
    .pipe(cssmin())
    .pipe(gulp.dest('dist/css'))
);