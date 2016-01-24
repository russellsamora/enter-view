var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();


gulp.task('default', ['compile'], function() {

	// serve
	browserSync.init({
		server: {
		    baseDir: './'
		},
		notify: false
	});

	// watch
	gulp.watch('enter-view.js', ['compile']);
	gulp.watch(['index.html', 'enter-view.min.js'], browserSync.reload);
});

gulp.task('compile', function() {
	return gulp.src('enter-view.js')
		.pipe(babel({ presets: ['es2015'] }))
		.pipe(uglify())
		.pipe(rename('enter-view.min.js'))
		.pipe(gulp.dest(''));
});