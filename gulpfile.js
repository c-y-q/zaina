var gulp = require("gulp");
var uglify = require("gulp-uglify");

gulp.task("mytask", function () {
    gulp.src("./**/*.js").
    pipe(uglify()).
    pipe(gulp.dest("./build/"))
});

gulp.task("auto", function () {
    gulp.watch("app/*.js", ["mytask"]);

});