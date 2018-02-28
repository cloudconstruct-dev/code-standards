var gulp = require('gulp'),
    webserver = require("gulp-webserver"),
    sourcemaps = require("gulp-sourcemaps"),
    concat = require("gulp-concat"),
    sass = require("gulp-sass"),
    cleanCSS = require("gulp-clean-css");


// JS
gulp.task('js', function () {
    // gulp.src(['./src/js/vendor/**/*.*'])
    //     .pipe(gulp.dest('./js/vendor/'));
    return gulp.src(['./Assets/Scripts/site.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./Assets/dist/js/'));
});


// sass task
gulp.task('sass', function() {
    return gulp.src(['./Assets/Styles/general.scss'])
        .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./Assets/dist/css/'));
});

// Minify CSS
gulp.task('minify-css', () => {
    return gulp.src('./Assets/dist/css/*.css')
      .pipe(sourcemaps.init())
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('.'));
  });

// local server for dev
gulp.task('serve', function() {
  gulp.src('./')
    .pipe(webserver({
      port:'9090',
      livereload: true,
      open: true
    }));
});


// Watchers
gulp.task('watch', function() {
    gulp.watch([
        './Assets/Styles/*.scss'
    ], ['sass', 'minify-css']);
    gulp.watch([
        './Assets/scripts/*.js'
    ], ['js']);    
});



gulp.task('default', ['sass', 'js', 'minify-css', 'serve', 'watch']);

