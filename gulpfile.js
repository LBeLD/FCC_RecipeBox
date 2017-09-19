var gulp = require('gulp');
var sass = require('gulp-sass');

//define task

gulp.task('sass', function(){
  return gulp.src('./src/assets/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./src/assets/css'));
});

gulp.task('watch', function(){
  gulp.watch('./src/assets/sass/*.scss', ['sass'])
});

//define default task

gulp.task('default', ['sass', 'watch']);
