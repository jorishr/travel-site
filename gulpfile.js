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
    modernizr = require('gulp-modernizr'),
    rev = require('gulp-rev'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    revReplace = require('gulp-rev-replace'),
    replaceInFile = require('replace-in-file');
    
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

// sprite tasks
function beginClean(){
    return del('./app/src/images/sprite/');
}

function createSprite(){
    return gulp.src('./app/src/images/icons/**/*.svg')
        .pipe(gulpSprite(spriteConfig))
        .pipe(gulp.dest('./app/src/images/sprite/'));
}

// build tasks
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

function htmlBuild(){
    return gulp.src('./app/index.html')
        .pipe(gulp.dest('./dist'));
};

function cssBuild(){
    return gulp.src('./app/main.css')
        .pipe(cssnano())
        .pipe(rev())
        .pipe(gulp.dest('./dist/assets/styles'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./dist/assets/styles'))
};

function updateHtmlCss(){
    const manifest = gulp.src("./dist/assets/styles/rev-manifest.json");
    return gulp.src('./dist/index.html')
        .pipe(revReplace({manifest: manifest}))
        .pipe(gulp.dest('./dist'));
};

function jsBuild(){
    return gulp.src(['./app/app-bundle.js', './app/vendor-bundle.js'])
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./dist/assets/scripts'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./dist/assets/scripts'));
};

function updateHtmlJs(){
    let manifest = gulp.src("./dist/assets/scripts/rev-manifest.json");
    return gulp.src('./dist/index.html')
        .pipe(revReplace({manifest: manifest}))
        .pipe(gulp.dest('./dist'));
};


async function updatePaths(){
    let options = {
        files: './dist/index.html',
        from: [
            /<link rel="stylesheet" href="/g, 
            /<script src="vendor-bundle/g, 
            /<script src="app-bundle/g, 
            /href="src/g, 
            /srcset="src/g, 
            /src\//g
        ],
        to: [
            '<link rel="stylesheet" href="assets/styles/', 
            '<script src="assets/scripts/vendor-bundle', 
            '<script src="assets/scripts/app-bundle', 
            'href="assets', 
            'srcset="assets', 
            'assets/'
        ]
    };
    try {
        const results = await replaceInFile(options)
        console.log('Replacement results:', results);
    }
    catch (error) {
        console.error('Error occurred:', error);
    };
};

function endBuildClean(){
    return del(['./dist/assets/styles/*.json', './dist/assets/scripts/*.json']);
};

// NOTE: browserSync setting with Vagrant: open: 'external, 'proxy: 'travel.local', port:80

function watchFiles(){
    browserSync.init({
        server: { baseDir: './app'}
        //open: "local",			
		//proxy: "localhost",	
		//port: 3005,
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
exports.htmlBuild = htmlBuild;
exports.cssBuild = cssBuild;
exports.jsBuild = jsBuild;
exports.updateHtmlCss = updateHtmlCss;
exports.updateHtmlJs = updateHtmlJs;
exports.updatePaths = updatePaths;
exports.endBuildClean = endBuildClean;
exports.build = series(deleteDistFolder, optimizeImages, htmlBuild, cssBuild, updateHtmlCss, jsBuild, updateHtmlJs, updatePaths, endBuildClean);