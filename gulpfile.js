var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var minify = require('gulp-minify');
var imagemin = require('gulp-imagemin');
var events = require('events');
var sassPaths = [
  'node_modules/foundation-sites/scss',
  'node_modules/motion-ui/src'
];

// Set Max Listeners for image compression, if not error.
events.EventEmitter.defaultMaxListeners = 100;

// Sass Compilers and Compress
gulp.task('sass', function() {
  return gulp.src('assets/scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // If css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('public/css'));
});

// Javascript Minify
gulp.task('compress', function() {
  gulp.src('assets/js/*.js')
    .pipe(minify({
        ext:{
            src:'-debug.js', // For development
            min:'.js'        // For production
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('public/js'))
});

// Image compresion
gulp.task('images', function(){
  return gulp.src('assets/img/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('public/img'))
});

// Font copy from development to production
gulp.task('fonts', function() {
  return gulp.src('assets/fonts/**/*')
  .pipe(gulp.dest('public/fonts'))
});

// Task runner comands
gulp.task('default', ['sass' , 'fonts', 'images', 'compress'] ,function() {
  gulp.watch(['assets/scss/**/*.scss'], ['sass']); // Sass Watch
  gulp.watch(['assets/js/**/*.js'], ['compress']); // JS Watch
  gulp.watch(['assets/img/**/*.+(png|jpg|gif|svg)']); // Image Minify
});
