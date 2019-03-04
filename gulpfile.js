var gulp  = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cleanCss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    postcss      = require('gulp-postcss'),
    nunjucks = require('gulp-nunjucks-render'),
    header = require('gulp-header'),
    htmlbeautify = require('gulp-html-beautify'),
    touch = require('gulp-touch-fd'),
    autoprefixer = require('autoprefixer');

// Variables for copyright header
var date = new Date().getFullYear();
var pkg = require('./package.json');
var banner = ['/*!',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * Version v<%= pkg.version %>',
    ' * Copyright 2016 - ' + date + ' <%= pkg.author %>',
    ' * <%= pkg.homepage %>'].join('\n');

var cssBanner = [banner,
    ' * ',
    ' * Parts of this code were created by the Bootstrap team',
    ' * and are available under MIT license at https://getbootstrap.com.',
    ' * Bootstrap version: <%= pkg.dependencies.bootstrap %>',
    ' */\n',
    ''].join('\n');

var jsBanner = [banner,
    ' */\n',
    ''].join('\n');

function buildCss(){
    return gulp.src(['scss/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([ autoprefixer({ browsers: [
                'Chrome >= 35',
                'Firefox >= 38',
                'Edge >= 12',
                'Explorer >= 10',
                'iOS >= 8',
                'Safari >= 8',
                'Android 2.3',
                'Android >= 4',
                'Opera >= 12']})]))
        .pipe(header(cssBanner, { pkg : pkg } ))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css/'))
        .pipe(cleanCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css/'))
}

function buildHtml() {
    return gulp.src('html/*.html')
        .pipe(nunjucks())
        .pipe(htmlbeautify({"preserve_newlines" : false, "max_preserve_newlines" : 1 }))
        .pipe(gulp.dest('dist/html/'))
        .pipe(touch());
}

function buildJs() {
    return gulp.src('js/*.js')
        .pipe(header(jsBanner, { pkg : pkg } ))
        .pipe(gulp.dest('dist/js/'));
}

function watcher() {
    gulp.watch(['scss/*.scss'], gulp.series(buildCss));
    gulp.watch(['html/**/*.html'], gulp.series(buildHtml));
    gulp.watch(['js/*.js'], gulp.series(buildJs));
}

exports.watch = gulp.series(buildCss, buildHtml, buildJs, watcher);
exports.default = gulp.series(buildHtml, buildCss, buildJs);
