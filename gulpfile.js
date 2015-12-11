var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();


gulp.task('default', ['min'], function() {

	// serve
	browserSync.init({
		server: {
		    baseDir: './'
		},
		notify: false
	});

	// watch
	gulp.watch('enter-view.js', ['min']);
	gulp.watch(['index.html', 'enter-view.min.js'], browserSync.reload);
});

gulp.task('min', function() {
	return gulp.src('enter-view.js')
		.pipe(uglify())
		.pipe(rename('enter-view.min.js'))
		.pipe(gulp.dest(''));
});