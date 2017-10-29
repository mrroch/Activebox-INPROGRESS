var gulp = require('gulp');

var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var size = require('gulp-size');


var handleError = function (err) {
  console.log(err);
  this.emit('end');
}

//============================================
//          JS tasks
//============================================    
gulp.task('js', function () {
  var s = size();
  return gulp.src('src/js/*.js')
    .pipe(plumber({
      errorHandler: handleError
    }))
    .pipe(sourcemaps.init())
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(s)
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream({
      match: '**/*.js'
    }))
});


gulp.task('browserSync', function () {
  browserSync.init({
    server: "./dist"
  });
});

//============================================
//          Sass tasks
//============================================
gulp.task('sass', function () {
  var s = size();
  return gulp.src('src/scss/base.scss')
    .pipe(plumber({
      errorHandler: handleError
    }))
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'compressed'
      })
    )
    .pipe(autoprefixer({
      browsers: ["> 1%"]
    }))
    .pipe(cleanCSS())
    .pipe(s)
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream({
      match: '**/*.css'
    }))
});

gulp.task('watch', function () {
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch("**/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['js', 'sass', 'browserSync', 'watch']);