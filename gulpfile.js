let gulp = require('gulp'),
	del = require('del'),
	browserSync = require('browser-sync').create(),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	csso = require('gulp-csso'),
	babel = require('gulp-babel'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin');

let path = {
	build: {
		html: 'build/',
		js: 'build/js/',
		css: 'build/css/',
		img: 'build/img/',
		fonts: 'build/fonts/',
		fav: 'build/favicons/',
		lib: 'build/lib',
		php: 'build/',
		other: 'build/'
	},
	source: {
		html: 'source/*.html',
		js: ['source/js/main.js', 'source/js/divslider.js'],
		css: ['source/css/fonts.css', 'source/css/main.css', 'source/css/media.css'],
		img: 'source/img/**/*.*',
		fonts: 'source/fonts/**/*.*',
		fav: ['source/favicons/**/*.*'],
		lib: 'source/lib/**/*.*',
		php: 'source/*.php',
		other: 'source/*.pdf'
	},
	watch: {
		html: 'source/*.html',
		js: 'source/js/*.js',
		css: 'source/css/*.css',
		img: 'source/img/**/*.*',
		other: ['source/fonts/**/*.*', 'source/favicons/**/*', 'source/lib/**/*.*', 'source/*.php']
	},
	clean: './build'
};

gulp.task('clean', () => {
	return del(['build/**/*'])
})

gulp.task('css', () => {
	return gulp.src(path.source.css)
			.pipe(autoprefixer({
				browsers: ['cover 95%']
			}))
			.pipe(concat('main.css'))
			.pipe(csso())
			.pipe(gulp.dest(path.build.css));
})

gulp.task('css-watch', ['css'], (done) => {
	browserSync.reload();
	done();
})

gulp.task('html', () => {
	return gulp.src(path.source.html)
			.pipe(gulp.dest(path.build.html));
})

gulp.task('html-watch', ['html'], (done) => {
	browserSync.reload();
	done();
})

gulp.task('js', () => {
	return gulp.src(path.source.js)
			.pipe(concat('main.js'))
			.pipe(babel({
				"presets": ["env"]
			}))
			.pipe(uglify())
			.pipe(gulp.dest(path.build.js));
})

gulp.task('js-watch', ['js'], (done) => {
	browserSync.reload();
	done();
})

gulp.task('img', () => {
	return gulp.src(path.source.img)
			.pipe(imagemin())
			.pipe(gulp.dest(path.build.img));
})

gulp.task('img-watch', ['img'], (done) => {
	browserSync.reload();
	done();
})

gulp.task('copy', () => {
	gulp.src(path.source.fav)
			.pipe(gulp.dest(path.build.fav));
	gulp.src(path.source.fonts)
			.pipe(gulp.dest(path.build.fonts));
	gulp.src(path.source.lib)
			.pipe(gulp.dest(path.build.lib));
	gulp.src(path.source.php)
			.pipe(gulp.dest(path.build.php));
	gulp.src(path.source.other)
			.pipe(gulp.dest(path.build.other));					
	return true;
})

gulp.task('copy-watch', ['copy'], (done) => {
	browserSync.reload();
	done();
})

gulp.task('run', ['html', 'css', 'js', 'img', 'copy'], () => {
	browserSync.init({
	    // server: {
	    //     baseDir: './build'
	    // }
	    proxy: "portfolio.pen"
    });
    gulp.watch(path.watch.css, ['css-watch']);
    gulp.watch(path.watch.html, ['html-watch']);
    gulp.watch(path.watch.js, ['js-watch']);
    gulp.watch(path.watch.img, ['img-watch']);
    gulp.watch(path.watch.other, ['copy-watch']);
})



gulp.task('default', ['run'])