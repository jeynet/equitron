let projectFolder = 'dist';
let sourceFolder = '#src';

let path = {
  build: {
    html: projectFolder + '/',
    css: projectFolder + '/css/',
    js: projectFolder + '/js/',
    img: projectFolder + '/img/',
    fonts: projectFolder + '/fonts/'
  },
  src: {
    html: [sourceFolder + '/*.html', '!' + sourceFolder + '/_*.html'],
    css: sourceFolder + '/scss/style.scss',
    js: sourceFolder + '/js/script.js',
    img: sourceFolder + '/img/**/*.+(png|jpg|gif|ico|svg|webp)',
    fonts: sourceFolder + '/fonts/**/*.ttf'
  },
  watch: {
    html: sourceFolder + '/**/*.html',
    css: sourceFolder + '/scss/**/*.scss',
    js: sourceFolder + '/js/**/*.js',
    img: sourceFolder + '/img/**/*.+(png|jpg|gif|ico|svg|webp)'
  },
  clean: './' + projectFolder + '/'
};

let { src, dest } = require('gulp'),
  gulp = require('gulp'),
  browsersync = require('browser-sync').create(),
  fileinclude = require('gulp-file-include'),
  del = require('del'),
  scss = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  groupMedia = require('gulp-group-css-media-queries'),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify-es').default,
  imageMin = require('gulp-imagemin'),
  webp = require('gulp-webp'),
  webpHtml = require('gulp-webp-html'),
  ttf2woff = require('gulp-ttf2woff'),
  ttf2woff2 = require('gulp-ttf2woff2'),
  fonter = require('gulp-fonter');

function browserSync() {
  browsersync.init({
    server: {
      baseDir: './' + projectFolder + '/'
    },
    port: 3000,
    notify: false
  })
};

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
};

function html() {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(webpHtml())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
};

function css() {
  return src(path.src.css)
    .pipe(scss({ outputStyle: 'expanded' }))
    .pipe(groupMedia())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 5 version'],
        cascade: true
      })
    )
    .pipe(dest(path.build.css))
    .pipe(cleanCss())
    .pipe( rename({ extname: '.min.css' }) )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
};

function js() {
  return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
};

function images() {
	return src(path.src.img)
    .pipe(webp({ quality: 70 }))
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(
      imageMin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: true }],
        interlaced: true,
        optimizationLevel: 3, // 0 - 7
      })
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
};

function fonts() {
  src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(dest(path.build.fonts));

  return src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts));
};

function clean() {
  return del(path.clean);
};

let build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.fonts = fonts;

exports.build = build;
exports.watch = watch;
exports.default = watch;


// gulp task
gulp.task('otf2ttf', function() {
  return src([sourceFolder + '/fonts/*.otf'])
    .pipe(fonter({ formats: ['ttf' ]} ))
    .pipe(dest(sourceFolder + '/fonts/'));
});
