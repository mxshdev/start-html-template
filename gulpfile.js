/* ======================================== >>>>> */
/* = General variables = */
/* ======================================== >>>>> */

var gulp         = require('gulp'),
		csso         = require('gulp-csso'),
		rename       = require('gulp-rename'),
		browserSync  = require('browser-sync'),
		uglify       = require('gulp-uglify'),
		concat       = require('gulp-concat'),
		autoprefixer = require('gulp-autoprefixer'),
		insert       = require('gulp-insert'),
		fileInclude  = require('gulp-file-include'),
		argv         = require('yargs').argv,
		sass         = require('gulp-sass'),
		zip          = require('gulp-zip'),
		fs           = require('fs');

/* ––––– Build settings ––––– */

var srcPath  = './src';
var destPath = './dest';

if (argv.srcPath == 'this') {
	srcPath  = '..';
	destPath = '..';
}

/* ======================================== >>>>> */
/* = Browser Sync Init = */
/* ======================================== >>>>> */

gulp.task('browser-sync', ['build-styles', 'build-scripts', 'build-scripts-libs', 'build-templates', 'copy-assets'], function() {
	browserSync.init({
		server: {
			baseDir: destPath
		},
		notify: false
	});
});

/* ======================================== >>>>> */
/* = Build styles = */
/* ======================================== >>>>> */

gulp.task('build-styles', function() {
	return gulp.src(srcPath + '/assets/css/app.scss')
						 .pipe(sass().on('error', onError))
						 .pipe(autoprefixer({ browsers: ['last 15 versions'], cascade: false }))
						 .pipe(gulp.dest(destPath + '/assets/css'))
						 .pipe(csso())
						 .pipe(rename({ suffix: '.min', prefix: '' }))
						 .pipe(gulp.dest(destPath + '/assets/css'))
						 .pipe(browserSync.stream());
});

/* ======================================== >>>>> */
/* = Build scripts = */
/* ======================================== >>>>> */

gulp.task('build-scripts', function() {
	return gulp.src(srcPath + '/assets/js/app.js')
						 .pipe(gulp.dest(destPath + '/assets/js'))
						 .pipe(rename({ suffix: '.min', prefix: '' }))
						 .pipe(uglify())
						 .on('error', onError)
						 .pipe(gulp.dest(destPath + '/assets/js'));
});

/* ======================================== >>>>> */
/* = Copy assets = */
/* ======================================== >>>>> */

gulp.task('copy-assets', function() {
	// Copy fonts
	gulp.src(srcPath + '/assets/font/**')
			.pipe(gulp.dest(destPath + '/assets/font'));
	
	// Copy and optimize images
	gulp.src(srcPath + '/assets/img/**')
			.pipe(gulp.dest(destPath + '/assets/img'));
	
	// Copy php files
	gulp.src(srcPath + '/assets/php/**')
			.pipe(gulp.dest(destPath + '/assets/php'));
	
	// Copy libs
	gulp.src(srcPath + '/assets/libs/**')
			.pipe(gulp.dest(destPath + '/assets/libs'));
});

/* ======================================== >>>>> */
/* = Build templates = */
/* ======================================== >>>>> */

gulp.task('build-templates', function() {
	return gulp.src(srcPath + '/templates/*.html')
						 .pipe(fileInclude())
						 .pipe(gulp.dest(destPath));
});

/* ======================================== >>>>> */
/* = Build libs scripts = */
/* ======================================== >>>>> */

gulp.task('build-scripts-libs', function() {
	return gulp.src([srcPath + '/assets/js/libs.js'])
						 .pipe(rename({ suffix: '.min', prefix: '' }))
						 .pipe(fileInclude())
						 .pipe(uglify())
						 .on('error', onError)
						 .pipe(gulp.dest(destPath + '/assets/js'));
});

/* ======================================== >>>>> */
/* = General watcher = */
/* ======================================== >>>>> */

gulp.task('watch', function() {
	gulp.watch(srcPath + '/assets/css/*.scss', ['build-styles']);
	gulp.watch(srcPath + '/assets/js/app.js', ['build-scripts']);
	gulp.watch(srcPath + '/**/*.html', ['build-templates']);
	gulp.watch(srcPath + '/assets/js/*.js').on('change', browserSync.reload);
	gulp.watch(destPath + '**/*.html').on('change', browserSync.reload);
});

/* ======================================== >>>>> */
/* = Create build archive = */
/* ======================================== >>>>> */

gulp.task('zip-build', function() {
	return gulp.src(['./**', '!' + destPath + '/**', '!./node_modules/**', '!./node_modules', '!' + destPath])
						 .pipe(zip('src.zip'))
						 .pipe(gulp.dest('./'));
});

/* ======================================== >>>>> */
/* = Error = */
/* ======================================== >>>>> */

function onError(err) {
	console.log(err);
	this.emit('end');
}

/* ======================================== >>>>> */
/* = Gulp Start = */
/* ======================================== >>>>> */

gulp.task('default', ['browser-sync', 'watch']);
gulp.task('build', ['build-styles', 'build-scripts', 'build-scripts-libs', 'build-templates', 'copy-assets', 'zip-build']);
