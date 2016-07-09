var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');  

gulp.task('scripts', function() {
	return gulp.src(['./js/src/preload.js', './js/src/jchar.js', './js/src/jblock.js', './js/src/q.js', './js/src/jall.js', './js/src/gapi.js', './js/src/index.js'])
		.pipe(concat('index.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./js/dist/'));
});