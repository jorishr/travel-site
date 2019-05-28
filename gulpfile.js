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
    postcss = require('gulp-postcss');
    
    
sass.compiler = require('node-sass');

function styles(){
    return gulp.src('./app/src/styles/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/'));
}

// NOTE: the order in the array of CSS tasks matters!
// NOTE: browserSync is setup with Vagrant localhost settings

function watchFiles(){
    browserSync.init({
        open: 'external',
        proxy: 'travel.local',
        port: 80    
    })
    // gulp.watch('<files>', htmlTask);
    gulp.watch('./app/src/styles/**/*.scss', styles);
    gulp.watch(['./app/index.html', './app/styles.css']).on('change', reload);
};

exports.styles = styles;
exports.watch = watchFiles;
