var gulp = require('gulp');
var del = require('del');
var connect = require('connect');
var serve = require('serve-static');
var less = require('gulp-less');

gulp.task('copy', function() {
	gulp.src('src/*.html')
		.pipe(gulp.dest('dist'))
	gulp.src('src/images/**/*')
		.pipe(gulp.dest('dist/images'));
	gulp.src('src/fonts/*')
		.pipe(gulp.dest('dist/fonts'));
	gulp.src('src/js/*')
		.pipe(gulp.dest('dist/js'));
});

gulp.task('style', function() {
	gulp.src('src/less/style.less')
		.pipe(less())
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('clean', function(cb) {
	del(['dist'], cb);
});

gulp.task('server', function() {
	return connect().use(serve(__dirname + '/dist'))
		.listen(8081)
		.on('listening', function() {
			console.log('Server Running...')
		});
});

gulp.task('watch', function() {
	gulp.watch('src/*.html', ['copy']);
	gulp.watch('src/less/**/*.less', ['style']);
});

gulp.task('default', ['copy', 'style', 'server', 'watch']);