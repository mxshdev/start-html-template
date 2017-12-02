/**
 * General variables
 */

var gulp = require('gulp'),
	csso = require('gulp-csso'),
	rename = require('gulp-rename'),
	browserSync = require('browser-sync'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	insert = require('gulp-insert'),
	fileInclude = require('gulp-file-include'),
	argv = require('yargs').argv,
	sass = require('gulp-sass'),
	zip = require('gulp-zip'),
	sourcemaps = require('gulp-sourcemaps'),
	watch = require('gulp-watch'),
	fs = require('fs');

// Build settings

var srcPath = './src';
var distPath = './dist';

if (argv.srcPath === 'this') {
	srcPath = '..';
	distPath = '..';
}

var isDisableOptimize = !!argv.disableOptimize;

/**
 * Browser Sync Init
 */

gulp.task('browser-sync', ['build-styles', 'build-scripts', 'build-scripts-libs', 'build-templates', 'copy-assets'], function() {
	browserSync.init({
		server: {
			baseDir: distPath,
			index: 'index.html'
		}
	});
});

/**
 * Build styles
 */

gulp.task('build-styles', function() {
	if (isDisableOptimize) {
		return gulp.src(srcPath + '/assets/css/app.scss')
			.pipe(sourcemaps.init())
			.pipe(sass().on('error', onError))
			.pipe(gulp.dest(distPath + '/assets/css'))
			.pipe(rename({ suffix: '.min', prefix: '' }))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(distPath + '/assets/css'))
			.pipe(browserSync.stream());
	}
	return gulp.src(srcPath + '/assets/css/app.scss')
		.pipe(sass().on('error', onError))
		.pipe(autoprefixer({ browsers: ['last 15 versions'], cascade: false }))
		.pipe(gulp.dest(distPath + '/assets/css'))
		.pipe(csso())
		.pipe(rename({ suffix: '.min', prefix: '' }))
		.pipe(gulp.dest(distPath + '/assets/css'))
		.pipe(browserSync.stream());
});

/**
 * Build scripts
 */

gulp.task('build-scripts', function() {
	if (isDisableOptimize) {
		return gulp.src(srcPath + '/assets/js/app.js')
			.pipe(fileInclude('//@@'))
			.pipe(gulp.dest(distPath + '/assets/js'))
			.pipe(rename({ suffix: '.min', prefix: '' }))
			.on('error', onError)
			.pipe(gulp.dest(distPath + '/assets/js'));
	}
	return gulp.src(srcPath + '/assets/js/app.js')
		.pipe(fileInclude('//@@'))
		.pipe(uglify())
		.pipe(gulp.dest(distPath + '/assets/js'))
		.pipe(rename({ suffix: '.min', prefix: '' }))
		.on('error', onError)
		.pipe(gulp.dest(distPath + '/assets/js'));
});

/**
 * Copy assets
 */

gulp.task('copy-assets', function() {
	// Copy fonts
	gulp.src(srcPath + '/assets/font/**')
		.pipe(gulp.dest(distPath + '/assets/font'));
	
	// Copy and optimize images
	gulp.src(srcPath + '/assets/img/**')
		.pipe(gulp.dest(distPath + '/assets/img'));
	
	// Copy php files
	gulp.src(srcPath + '/assets/php/**')
		.pipe(gulp.dest(distPath + '/assets/php'));
	
	// Copy libs
	gulp.src(srcPath + '/assets/libs/**')
		.pipe(gulp.dest(distPath + '/assets/libs'));
	
	// Copy templates
	gulp.src(srcPath + '/templates/**')
		.pipe(gulp.dest(distPath + '/templates'));
});

/**
 * Build templates
 */

gulp.task('build-templates', function() {
	return gulp.src(srcPath + '/templates/*.html')
		.pipe(fileInclude('//@@'))
		.on('error', onError)
		.pipe(gulp.dest(distPath));
});

/**
 * Build libs scripts
 */

gulp.task('build-scripts-libs', function() {
	if (isDisableOptimize) {
		return gulp.src([srcPath + '/assets/js/libs.js'])
			.pipe(rename({ suffix: '.min', prefix: '' }))
			.pipe(fileInclude('//@@'))
			.on('error', onError)
			.pipe(gulp.dest(distPath + '/assets/js'));
	}
	return gulp.src([srcPath + '/assets/js/libs.js'])
		.pipe(rename({ suffix: '.min', prefix: '' }))
		.pipe(fileInclude('//@@'))
		.pipe(uglify())
		.on('error', onError)
		.pipe(gulp.dest(distPath + '/assets/js'));
});

/**
 * General watcher
 */

gulp.task('watch', function() {
	watch([srcPath + '/**/*.scss', srcPath + '/**/*.css'], function(e) {
		gulp.start('build-styles');
	});
	watch([srcPath + '/assets/js/**/*.js'], function(e) {
		gulp.start('build-scripts');
	});
	watch([srcPath + '/assets/libs/**/*.js', srcPath + '/assets/js/libs.js'], function(e) {
		gulp.start('build-scripts-libs');
	});
	watch(srcPath + '/**/*.html', function(e) {
		gulp.start('build-templates');
	});
	watch([distPath + '/**/*.js', distPath + '/**/*.html'], function(e) {
		browserSync.reload();
	});
});

/**
 * Create build archive
 */

gulp.task('zip-build', function() {
	return gulp.src(['./**', '!' + distPath + '/**', '!./node_modules/**', '!./node_modules', '!' + distPath])
		.pipe(zip('src.zip'))
		.pipe(gulp.dest('./'));
});

// Error handler

function onError(err) {
	console.log(err);
	this.emit('end');
}

/**
 * Gulp Start
 */

gulp.task('default', ['browser-sync', 'watch']);
gulp.task('build', ['build-styles', 'build-scripts', 'build-scripts-libs', 'build-templates', 'copy-assets', 'zip-build']);