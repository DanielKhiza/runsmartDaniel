/* для использования гульп функций прописываем */
const gulp = require('gulp');
const browserSync = require('browser-sync'); /* позволяет пересохранять все изменения прямо в браузере */
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css'); /* сжимает файл цсс убирает лишние файлы сасс */
const autoprefixer = require('gulp-autoprefixer'); /*  автопрефикс добавляет автоматом для експерементальных цсс */
const rename = require("gulp-rename"); /* для переименование папок указаных гулп  файле */

/* Здесь прописываем функционал и задачи которые он будет делать */
gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "src"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError)) /* показывает какая папка будет включатьсяв браузере это папка стилей + прописан код для сжатитя файлов сасс */
        .pipe(rename({ suffix: '.min', prefix: '' })) /* при компиляции можно переименовывать с суфиксами и префиксами через сасс в цсс */
        .pipe(autoprefixer()) /* автоматическиставиться для последних версий браузера */
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
    /* прописываем код где просим программу следить за изменениями сразу
    в браузере */
})

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));