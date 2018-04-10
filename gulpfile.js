let gulp = require('gulp'),
	del = require('del'),
	browserSync = require('browser-sync').create();

let path = {
	build: {
		html: 'build/',
		js: 'build/js/',
		css: 'build/css/',
		img: 'build/img/',
		fonts: 'build/fonts/',
		all: 'build/'
	},
	source: {
		html: 'source/*.html',
		js: 'source/js/*.js',
		css: 'source/css/*.css',
		img: 'source/img/**/*.*',
		fonts: 'source/fonts/**/*.*',
		all: 'source/**/*'
	},
	watch: {
		all: 'source/**/*'
	},
	clean: './build'
};

gulp.task('copy', () => {
	return gulp.src(path.source.all)
			.pipe(gulp.dest(path.build.all));
})

gulp.task('copy-watch', ['copy'], (done) => {
	browserSync.reload();
	done();
})

gulp.task('clean', () => {
	return del(['build/**/*'])
})

gulp.task('run', ['copy'], () => {
	browserSync.init({
	    server: {
	        baseDir: './build'
	    }
    });
    gulp.watch(path.watch.all, ['copy-watch']);
})

gulp.task('default', ['run'])