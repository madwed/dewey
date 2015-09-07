var gulp = require("gulp"),
    eslint = require("gulp-eslint"),
    rename = require("gulp-rename"),
    sass = require("gulp-sass"),
    runSeq = require("run-sequence"),
    browserify = require("browserify"),
    source = require("vinyl-source-stream"),
    babelify = require("babelify"),
    exorcist = require("exorcist");

var js_path = "./app/**/*.js";
var js_out = "decima.js";
var js_start = "./app/index.js";
var scss_start = "./scss/main.scss";
var scss_path = "./scss/**/*.scss";
var css_out = "style.css";
var build_path = "./build";
var map_file = "./build/decima.js.map";
var tests = "./test/**/*.spec.js";

gulp.task("lintJS", function(){
     return gulp.src([js_path])
         .pipe(eslint())
         .pipe(eslint.format())
         .pipe(eslint.failOnError());
});

gulp.task("buildJS", ["lintJS"], function () {

    var bundler = browserify({
        debug: true,
        ignoreMissing: true
    });
    bundler.add(js_start);
    bundler.transform(babelify);
    bundler.bundle()
        .pipe(exorcist(map_file))
        .pipe(source(js_out))
        .pipe(gulp.dest(build_path));

});

gulp.task("buildCSS", function () {
    return gulp.src(scss_start)
        .pipe(sass({
            errLogToConsole:true
        }))
        .pipe(rename(css_out))
        .pipe(gulp.dest(build_path))
});


//gulp.task("gameCoverage:instrument", function () {
//    return gulp.src(game_files)
//        .pipe(istanbul({
//            instrumenter: isparta.Instrumenter
//        }))
//        .pipe(istanbul.hookRequire());
//});

//gulp.task("gameCoverage:report", function (done) {
//    return gulp.src(game_files, {read: false})
//        .pipe(istanbul.writeReports());
//});


//gulp.task("testGame", function () {
//    // return gulp.src(tests)
//    //         .pipe(mocha({
//    //             reporter: "nyan",
//    //             compilers: {
//    //                 js: mochababel
//    //             }
//    //         }));
//});

//gulp.task("testGame:coverage", function (done) {
//    runSeq("gameCoverage:instrument", "testGame", "gameCoverage:report", done);
//});

gulp.task("default", function(){
    gulp.start(["buildJS", "buildCSS"]);
    gulp.watch([js_start, js_path], ["lintJS"]);
    gulp.watch([js_start, js_path], function(){
        runSeq("buildJS");
    });
    gulp.watch(scss_path, function(){
        runSeq("buildCSS");
    });
});

