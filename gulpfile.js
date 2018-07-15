const gulp = require("gulp")
const concat = require("gulp-concat")
const sass = require("gulp-sass")
/*
*/

gulp.task("build-dist-js", function() {
  return gulp
    .src([
      "./src/js/imports.js",
      "./src/js/libs/*.js",
      // "./src/libs/getViewport.js",
      "./src/js/scale-core.js",
      "./src/js/scale-dom-io.js",
      "./src/js/scale.js",
    ])
    .pipe(concat("scale.js"))
    .pipe(gulp.dest("./dist/"))
})

gulp.task("build-dist-css", function() {
  return gulp
    .src(["./src/css/_container.scss", "./src/css/_element.scss"])
    .pipe(gulp.dest('./dist/'))
})

gulp.task("build-test-css", function() {
  return gulp
    .src("./test/test.scss")
    .pipe(sass())
    .pipe(gulp.dest("./test/"))
})

gulp.task("build", ["build-dist-js", "build-dist-css"])
gulp.task("build-test", ["build-test-css"])

/*
gulp.task('build', function () {
    return gulp
      .src('./src/scale.js')
      .pipe(gulp.dest('./dist/'))
});

*/
