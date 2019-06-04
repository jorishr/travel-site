/* 
- CSS Worklow based on postcss for style tasks
- JS files are processed with Webpack
- BrowserSync is configured for Vagrant localhost
 */
const { series } = require('gulp');
var gulp = require('gulp'),
    autoprefixer = require('autoprefixer'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    webpack = require('webpack'),    
    gulpSprite = require('gulp-svg-sprite'),
    del = require('del'),
    imageMin = require('gulp-imagemin'),
    modernizr = require('gulp-modernizr');
    
sass.compiler = require('node-sass');

function styles(){
    return gulp.src('./app/src/styles/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/'));
};

// NOTE: the order in the array of CSS tasks matters!

function jsCompile(cb){
    webpack(require('./webpack.config.js'), function(err, stats){
        if (err){console.log(err.toString());};
        console.log(stats.toString());
        cb();       // make gulp aware task is done
    });
}

let spriteConfig = {
    shape: {
        spacing: {
            padding: 1
        }
    },
    svg: {
        xmlDeclaration: false,
        doctypeDeclaration: false,
        namespaceIDs: false,
        namespaceClassnames: false
    },
    mode: {
        symbol: true,
    }
}

function beginClean(){
    return del('./app/src/images/sprite/');
}

function createSprite(){
    return gulp.src('./app/src/images/icons/**/*.svg')
        .pipe(gulpSprite(spriteConfig))
        .pipe(gulp.dest('./app/src/images/sprite/'));
}

function deleteDistFolder(){
    return del('./dist');
}

function optimizeImages(){
    return gulp.src(['./app/src/images/**/*', '!./app/src/images/icons', '!./app/src/images/icons/**/*'])
        .pipe(imageMin({
            progressive: true,  // jpeg
            interlaced: true,   // gif
            multipass: true     // svg
        }))
        .pipe(gulp.dest('./dist/assets/images/'));
};

function applyModernizr(){
    return gulp.src(['./app/src/styles/**/*.scss', './app/src/scripts/**/*.js'])
        .pipe(modernizr({
            'options': ['setClasses']
        }))
        .pipe(gulp.dest('./app/'));
};

// NOTE: browserSync setting with Vagrant: proxy: 'travel.local', port:80

function watchFiles(){
    browserSync.init({
        open: 'external',
        proxy: 'travel.local',
        port: 80    
    })

    const mainFiles = ['./app/index.html', './app/main.css', './app/bundle.js']
    gulp.watch('./app/src/styles/**/*.scss', styles);
    gulp.watch('./app/src/scripts/**/*.js', gulp.series(applyModernizr, jsCompile));
    gulp.watch('./app/src/images/icons/**/*.svg', gulp.series(beginClean, createSprite));
    gulp.watch(mainFiles).on('change', reload);
};

exports.styles = styles;
exports.jsCompile = jsCompile;
exports.watch = watchFiles;
exports.createSprite = createSprite;
exports.beginClean = beginClean;
exports.optimizeImages = optimizeImages;
exports.deleteDistFolder = deleteDistFolder;
exports.applyModernizr = applyModernizr;
exports.build = series(deleteDistFolder, optimizeImages);