/* 
- CSS Worklow based on postcss for style tasks
- JS files are processed with Webpack
- BrowserSync is configured for Vagrant localhost
 */
var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssVars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    cssImport = require('postcss-import'),
    mixins = require('postcss-mixins'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;


function stylesTask(){
    return gulp.src('./app/src/styles/main.css')
        .pipe(postcss([cssImport, mixins, cssVars, nested, autoprefixer]))
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
    gulp.watch('./app/src/styles/**/*.css', stylesTask);
    gulp.watch(['./app/index.html', './app/styles.css']).on('change', reload);
};

exports.styles = stylesTask;
exports.watch = watchFiles;
