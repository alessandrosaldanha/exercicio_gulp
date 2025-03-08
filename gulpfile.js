const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function comprimeImagens() {
  return gulp
    .src('./Source/Images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./Build/Images'));
}


function comprimeJavascript() {
  return gulp
    .src('./Source/Scripts/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(obfuscate())
    .on('error', function(err) {
      console.error('Erro:', err.toString());
    })
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./Build/Scripts'));
}

function compilaSass() {
  return gulp
    .src('./Source/Styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed'}))
    .on('error', sass.logError)
    .pipe(sourcemaps.write('./maps'))
    .pipe((imagemin()))
    .pipe(gulp.dest('./Build/Styles'));
}

exports.default = () => {
  gulp.watch('./Source/Styles/**/*.scss', {ignoreInitial: false}, compilaSass);
  gulp.watch('./Source/Scripts/**/*.js', {ignoreInitial: false}, comprimeJavascript);
  gulp.watch('./Source/Images/*', {ignoreInitial: false}, comprimeImagens);
}