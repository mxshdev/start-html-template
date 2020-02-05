/**
 * General variables
 */

var gulp = require('gulp'),
    csso = require('gulp-csso'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    fileInclude = require('gulp-file-include'),
    argv = require('yargs').argv,
    sass = require('gulp-sass'),
    zip = require('gulp-zip'),
    sourcemaps = require('gulp-sourcemaps'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    del = require('del');

// Build settings

var srcPath = './src';
var devPath = './dev';
var distPath = './dist';

if (argv.srcPath === 'this') {
    srcPath = '..';
    distPath = '..';
    devPath = '..';
}

var isDisableOptimize = !!argv.disableOptimize;

/**
 * Browser Sync Init
 */

gulp.task('browser-sync', function (cb) {
    browserSync.init({
        server: {
            baseDir: devPath,
            index: 'index.html'
        }
    });
});

/**
 * Build styles
 */

gulp.task('build-styles', function (cb) {
    if (isDisableOptimize) {
        gulp.src(srcPath + '/assets/css/main.scss')
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', onError))
            .pipe(autoprefixer({overrideBrowserslist: ['last 100 versions']}))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(devPath + '/assets/css'))
            .pipe(rename({suffix: '.min', prefix: ''}))
            .pipe(gulp.dest(devPath + '/assets/css'))
            .pipe(browserSync.stream());
        cb();
    }
    gulp.src(srcPath + '/assets/css/main.scss')
        .pipe(sass().on('error', onError))
        .pipe(autoprefixer({overrideBrowserslist: ['last 100 versions'], cascade: false}))
        .pipe(gulp.dest(distPath + '/assets/css'))
        .pipe(csso({
            comments: false
        }))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(gulp.dest(distPath + '/assets/css'))
        .pipe(browserSync.stream());
    cb();
});

/**
 * Build scripts
 */

gulp.task('build-scripts', function (cb) {
    if (isDisableOptimize) {
        gulp.src(srcPath + '/assets/js/main.js')
            .pipe(fileInclude('//@@'))
            .pipe(gulp.dest(devPath + '/assets/js'))
            .on('error', onError)
            .pipe(rename({suffix: '.min', prefix: ''}))
            .pipe(gulp.dest(devPath + '/assets/js'));
        cb();
    }
    gulp.src(srcPath + '/assets/js/main.js')
        .pipe(fileInclude('//@@'))
        .pipe(gulp.dest(distPath + '/assets/js'))
        .pipe(uglify())
        .on('error', onError)
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(gulp.dest(distPath + '/assets/js'));
    cb();
});

/**
 * Optimize Images
 */

gulp.task('images', function (cb) {
    gulp.src([srcPath + '/**/*.png', srcPath + '/**/*.svg', srcPath + '/**/*.jpg', srcPath + '/**/*.jpeg', srcPath + '/**/*.gif'])
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true, optimizationLevel: 3}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 7}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest(distPath));
    cb();
});

/**
 * Copy assets
 */

gulp.task('copy-assets', function (cb) {
    // Copy fonts
    gulp.src(srcPath + '/assets/font/**')
        .pipe(gulp.dest(devPath + '/assets/font'))
        .pipe(gulp.dest(distPath + '/assets/font'));

    // Copy and optimize images
    gulp.src(srcPath + '/assets/img/**')
        .pipe(gulp.dest(devPath + '/assets/img'))
        .pipe(gulp.dest(distPath + '/assets/img'));

    // Copy php files
    gulp.src(srcPath + '/assets/php/**')
        .pipe(gulp.dest(devPath + '/assets/php'))
        .pipe(gulp.dest(distPath + '/assets/php'));

    // Copy vendor
    gulp.src(srcPath + '/assets/vendor/**')
        .pipe(gulp.dest(devPath + '/assets/vendor'))
        .pipe(gulp.dest(distPath + '/assets/vendor'));

    // Copy templates
    gulp.src(srcPath + '/templates/**')
        .pipe(gulp.dest(devPath + '/templates'))
        .pipe(gulp.dest(distPath + '/templates'));

    cb();
});

/**
 * Build templates
 */

gulp.task('build-templates', function (cb) {
    gulp.src(srcPath + '/templates/*.html')
        .pipe(fileInclude('//@@'))
        .pipe(htmlmin({
            collapseWhitespace: false,
            collapseInlineTagWhitespace: false,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            removeComments: true,
            removeStyleLinkTypeAttributes: true,
            removeScriptTypeAttributes: true
        }))
        .on('error', onError)
        .pipe(gulp.dest(devPath))
        .pipe(gulp.dest(distPath));
    cb();
});

/**
 * Build vendor scripts
 */

gulp.task('build-scripts-vendor', function (cb) {
    if (isDisableOptimize) {
        gulp.src([srcPath + '/assets/js/vendor.js'])
            .pipe(fileInclude('//@@'))
            .pipe(gulp.dest(devPath + '/assets/js'))
            .on('error', onError)
            .pipe(rename({suffix: '.min', prefix: ''}))
            .pipe(gulp.dest(devPath + '/assets/js'));
        cb();
    }
    gulp.src([srcPath + '/assets/js/vendor.js'])
        .pipe(fileInclude('//@@'))
        .pipe(gulp.dest(devPath + '/assets/js'))
        .pipe(uglify())
        .on('error', onError)
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(gulp.dest(distPath + '/assets/js'));
    cb();
});

/**
 * Reload browser
 */

gulp.task('browser-reload', function (cb) {
    browserSync.reload();
    cb();
});

/**
 * General watcher
 */

gulp.task('watch', function (cb) {
    gulp.watch([srcPath + '/**/*.scss', srcPath + '/**/*.css'], gulp.series('build-styles'));
    gulp.watch([srcPath + '/assets/js/**/*.js'], gulp.series('build-scripts', 'browser-reload'));
    gulp.watch([srcPath + '/assets/vendor/**/*.js', srcPath + '/assets/js/vendor.js'], gulp.series('build-scripts-vendor', 'browser-reload'));
    gulp.watch(srcPath + '/**/*.html', gulp.series('build-templates', 'browser-reload'));
});

/**
 * Create build archive
 */

gulp.task('zip-build', function (cb) {
    gulp.src(['./**', '!' + distPath + '/**', '!./node_modules/**', '!./node_modules', '!' + distPath])
        .pipe(zip('src.zip'))
        .pipe(gulp.dest('./'));
    cb();
});

/**
 * Clean dist
 */
gulp.task('clean-dist', function (cb) {
    del.sync(distPath + '/**', {force: true});
    cb();
});

/**
 * Clean dev
 */
gulp.task('clean-dev', function (cb) {
    del.sync(devPath + '/**', {force: true});
    cb();
});

// Error handler

function onError(err) {
    console.log(err);
    this.emit('end');
}

/**
 * Gulp Start
 */

gulp.task('default', gulp.series('clean-dev', 'build-styles', 'build-scripts', 'build-scripts-vendor', 'build-templates', 'copy-assets', gulp.parallel('browser-sync', 'watch')));
gulp.task('build', gulp.series('clean-dist', 'build-styles', 'build-scripts', 'build-scripts-vendor', 'build-templates', 'copy-assets', 'images'));
