var gulp = require('gulp'),
  bowerFiles = require('main-bower-files'),
  $ = require('gulp-load-plugins')({ lazy: true }),
  browserSync = require('browser-sync');

var paths = {
  resources: {
    javascript: 'src/js/',
    sass: 'src/sass/',
    images: 'src/images/',
    index: 'public/',
    views: 'public/views/'
  },
  public: {
    fonts: 'public/assets/fonts',
    scripts: 'public/assets/js',
    styles: 'public/assets/css',
    images: 'public/assets/images',
    index: 'public',
    views: 'public/views'
  }
};

var fileExt = {
  css: '*.css',
  js: '*.js',
  sass: '*/*.scss',
  script: 'script.js',
  styleSASS: 'style.scss',
  all: '**',
  html: '*.html'
};

gulp.task('styles', function () {
  return gulp.src(paths.resources.sass + fileExt.styleSASS)
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.autoprefixer('last 5 version'))
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.cleanCss())
    .pipe(gulp.dest(paths.public.styles))
    .pipe($.notify(function (file) {
      return 'Compiler SASS file: ' + file.relative;
    }));
});

gulp.task('scripts', function () {
  return gulp.src(paths.resources.javascript + fileExt.script)
    .pipe($.plumber())
    .pipe($.babel({
      presets: ['@babel/env']
    }))
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.uglify())
    .pipe(gulp.dest(paths.public.scripts))
    .pipe($.notify(function (file) {
      return 'Compiler Scripts file: ' + file.relative;
    }));
});

gulp.task('stylesBower', function () {
  return gulp.src(bowerFiles('**/' + fileExt.css))
    .pipe($.concat('components.min.css'))
    .pipe($.cleanCss())
    .pipe(gulp.dest(paths.public.styles))
    .pipe($.notify(function (file) {
      return 'Compiler Bower Styles file: ' + file.relative;
    }));
});

gulp.task('scriptsBower', function () {
  return gulp.src(bowerFiles('**/' + fileExt.js))
    .pipe($.concat('components.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(paths.public.scripts))
    .pipe($.notify(function (file) {
      return 'Compiler Bower Scripts file: ' + file.relative;
    }));
});

gulp.task('images', function () {
  return gulp.src(paths.resources.images + fileExt.all)
    .pipe($.changed('images'))
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(paths.public.images))
    .pipe($.size({ title: 'images' }))
    .pipe($.notify(function (file) {
      return 'Optimizes the images: ' + file.relative;
    }));
});

gulp.task('browserSync', function () {
  browserSync.init(null, {
    server: { baseDir: paths.public.index }
  });
});

gulp.task('bsReload', function () {
  browserSync.reload();
});

gulp.task('watch', function () {
  gulp.watch(paths.resources.sass + fileExt.sass, ['styles']);
  gulp.watch(paths.resources.javascript + fileExt.js, ['scripts']);
  gulp.watch(paths.resources.index + fileExt.html, ['bsReload']);
  gulp.watch(paths.resources.views + fileExt.html, ['bsReload']);
});

gulp.task('default', function () {
  gulp.start(
    'styles',
    'scripts',
    'stylesBower',
    'scriptsBower',
    'browserSync',
    'watch'
  );
});
