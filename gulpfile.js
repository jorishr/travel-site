/* 
- CSS Worklow based on postcss for style tasks
- JS files are processed with Webpack
- BrowserSync is configured for Vagrant localhost
 */
var gulp = require('gulp'),
    autoprefixer = require('autoprefixer'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    webpack = require('webpack');
    
sass.compiler = require('node-sass');

function styles(){
    return gulp.src('./app/src/styles/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/'));
}

function jsCompile(cb){
    webpack(require('./webpack.config.js'), function(err, stats){
        if (err){console.log(err.toString());}
        console.log(stats.toString());
        cb();       // make gulp aware task is done
    });
}

// NOTE: the order in the array of CSS tasks matters!
// NOTE: browserSync setting with Vagrant: proxy: 'travel.local', port:80

function watchFiles(){
    browserSync.init({
        open: 'external',
        proxy: 'travel.local',
        port: 80    
    })

    const mainFiles = ['./app/index.html', './app/main.css', './app/bundle.js']
    gulp.watch('./app/src/styles/**/*.scss', styles);
    gulp.watch('./app/src/scripts/**/*.js', jsCompile);
    gulp.watch(mainFiles).on('change', reload);
};

exports.styles = styles;
exports.jsCompile = jsCompile;
exports.watch = watchFiles;

