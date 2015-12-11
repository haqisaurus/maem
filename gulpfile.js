var gulp = require('gulp');

// include js
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');

var uglifyjs    = require('gulp-uglifyjs');

// include  style
var autoprefix  = require('gulp-autoprefixer');
var minifyCSS   = require('gulp-minify-css');
var less        = require('gulp-less');
// var run         = require('run-sequence');
var watch       = require('gulp-watch');

gulp.task('script', function() {
	gulp.src(['./script-src/**/*.js', './script-src/*.js'])
	// .pipe(sourcemaps.init())
	.pipe(concat('script.min.js')) 
	// .pipe(stripDebug())
	// .pipe(uglify())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./js/'))
	// .pipe(livereload());
	// .pipe(browserSync.reload({stream : true}));

});

gulp.task('script_lib', function() {
	gulp.src([
			'./bower_components/jquery/jquery.min.js', 
			'./bower_components/jquery-mobile/jquery.mobile.js',
			'./bower_components/underscore/underscore.js',
			'./bower_components/backbone/backbone.js',
			])
	// .pipe(sourcemaps.init())
	.pipe(concat('lib.min.js')) 
	// .pipe(stripDebug())
	// .pipe(uglify())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./js/'))
	// .pipe(livereload());
	// .pipe(browserSync.reload({stream : true}));

});


// CSS concat, auto-prefix and minify
gulp.task('style', function() {
	gulp.src(['./style-src/**/*.less', './style-src/*.less'])
	// .pipe(sourcemaps.init())
	.pipe(less())
    .on('error', function(err) { console.error(err.message); this.end(); })
	.pipe(concat('style.min.css'))
	.pipe(autoprefix('last 2 versions'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./css/'))
	// .pipe(browserSync.reload({stream : true}));

});

gulp.task('default', ['script', 'style'], function() {

	// watch for JS changes
	gulp.watch('./script-src/**/*.js', ['script']);

	// watch for CSS changes
	gulp.watch('./style-src/**/*.less', ['style']);
});