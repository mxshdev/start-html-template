/* ======================================== >>>>> */
/* = General variables = */
/* ======================================== >>>>> */

var gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		cleanCSS     = require('gulp-clean-css'),
		rename       = require('gulp-rename'),
		browserSync  = require('browser-sync'),
		uglify       = require('gulp-uglify'),
		concat       = require('gulp-concat'),
		autoprefixer = require('gulp-autoprefixer'),
		insert       = require('gulp-insert'),
		fileInclude  = require('gulp-file-include'),
		argv         = require('yargs').argv;

/* ======================================== >>>>> */
/* = Browser Sync Init = */
/* ======================================== >>>>> */

gulp.task('browser-sync', ['styles-main', 'scripts-main', 'scripts-libs'], function() {
	browserSync.init({
		server: {
			baseDir: "./app"
		},
		notify: false
	});
});

/* ======================================== >>>>> */
/* = General styles = */
/* ======================================== >>>>> */

gulp.task('styles-main', function() {
	return gulp.src('./app/assets/css/app.scss')
						 .pipe(sass()).on('error', onError)
						 .pipe(rename({ suffix: '.min', prefix: '' }))
						 .pipe(autoprefixer({ browsers: ['last 15 versions'], cascade: false }))
						 .pipe(cleanCSS())
						 .pipe(gulp.dest('app/assets/css'))
						 .pipe(browserSync.stream());
});

/* ======================================== >>>>> */
/* = General scripts = */
/* ======================================== >>>>> */

gulp.task('scripts-main', function() {
	return gulp.src('./app/assets/js/app.js')
						 .pipe(rename({ suffix: '.min', prefix: '' }))
						 .pipe(uglify())
						 .on('error', onError)
						 .pipe(gulp.dest('./app/assets/js/'));
});

/* ======================================== >>>>> */
/* = Library scripts = */
/* ======================================== >>>>> */

gulp.task('scripts-libs', function() {
	return gulp.src(['./app/assets/js/libs.js'])
						 .pipe(rename({ suffix: '.min', prefix: '' }))
						 .pipe(fileInclude())
						 .pipe(uglify())
						 .on('error', onError)
						 .pipe(gulp.dest('./app/assets/js/'));
});

/* ======================================== >>>>> */
/* = General watcher = */
/* ======================================== >>>>> */

gulp.task('watch', function() {
	gulp.watch('./app/assets/css/*.scss', ['styles-main']);
	gulp.watch('./app/assets/js/app.js', ['scripts-main']);
	gulp.watch('./app/assets/js/*.js').on('change', browserSync.reload);
	gulp.watch('./app/**/*.html').on('change', browserSync.reload);
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
gulp.task('build', ['styles-main', 'scripts-main', 'scripts-libs']);
