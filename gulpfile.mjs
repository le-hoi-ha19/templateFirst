import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import nodeSass from 'node-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
import concat from 'gulp-concat';

const sass = gulpSass(nodeSass); // Khởi tạo gulp-sass với node-sass

// SCSS to CSS task
export function style() {
    return gulp
        .src("./assets/scss/**/*.scss", { sourcemaps: true }) // Lấy tất cả các file SCSS
        .pipe(sourcemaps.init()) // Khởi tạo sourcemaps
        .pipe(sass().on("error", sass.logError)) // Biên dịch SCSS thành CSS
        .pipe(autoprefixer({ overrideBrowserslist: ['last 2 versions'] })) // Thêm vendor prefix
        .pipe(concat('styles.css')) // Gộp tất cả thành một file CSS
        .pipe(sourcemaps.write('./')) // Ghi sourcemaps
        .pipe(gulp.dest('assets/css')) // Lưu file CSS vào thư mục dist
        .pipe(browserSync.stream()); // Tự động reload trình duyệt
}

// HTML task
export function html() {
    return gulp
        .src("./assets/html/login.html")
        .on("error", console.error.bind(console))
        .pipe(gulp.dest("template"))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
}

// Watch function
export function watch() {
    const baseDir = "./template/login.html";
    browserSync.init({
        server: {
            baseDir: [baseDir],
        },
        port: 1113,
    });

    gulp.watch("./assets/scss/**/*.scss", style);
    gulp.watch("./assets/html/**.html", html);
    gulp.watch("./*.html").on("change", browserSync.reload);
    gulp.watch("assets/css/*.css").on("change", browserSync.reload);
}

// Default task
const build = gulp.series(watch);
export default build;
