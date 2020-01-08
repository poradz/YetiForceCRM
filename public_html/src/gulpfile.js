/**
 * gulpfile
 *
 * @description contains css tasks
 * @license YetiForce Public License 3.0
 * @author Tomasz Poradzewski <t.poradzewski@yetiforce.com>
 */

const gulp = require('gulp')
const stylus = require('gulp-stylus')
const cleanCSS = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
sass.compiler = require('node-sass')

/**
 * Compile quasar.css file
 *
 * @returns {function} task
 */
function getCompileCssTask() {
	return function compileCssTask() {
		const quasarCssPath = 'css/quasar.styl'
		return gulp
			.src(quasarCssPath, { sourcemaps: true })
			.pipe(stylus())
			.pipe(autoprefixer())
			.pipe(
				cleanCSS({}, details => {
					console.log(`${details.name}: ${details.stats.originalSize}`)
					console.log(`${details.name}: ${details.stats.minifiedSize}`)
				})
			)
			.pipe(gulp.dest('./css'), { sourcemaps: true })
	}
}
/**
 * Compile Main.min.css file
 *
 * @returns {function} task
 */
const stylesPath = '../layouts/basic/styles/'
function getMinifyCssTask() {
	return function minifyCssTask() {
		return gulp
			.src(`${stylesPath}Main.css`)
			.pipe(sourcemaps.init())
			.pipe(
				rename({
					suffix: '.min'
				})
			)
			.pipe(autoprefixer())
			.pipe(
				cleanCSS({}, details => {
					console.log(`${details.name}: ${details.stats.originalSize}`)
					console.log(`${details.name}: ${details.stats.minifiedSize}`)
				})
			)
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(stylesPath))
	}
}

gulp.task('compile-css', function() {
	return gulp
		.src(`${stylesPath}Main.scss`)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(stylesPath))
})

gulp.task('watch-css', function() {
	gulp.watch(`${stylesPath}**/*.scss`, gulp.series('compile-css'))
})

gulp.task('compile-quasar-css', getCompileCssTask())
gulp.task('minify-css', getMinifyCssTask())
