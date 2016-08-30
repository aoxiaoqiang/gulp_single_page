var gulp = require('gulp');
var connect = require('gulp-connect'); //创建本地服务
var uglify = require('gulp-uglify'); //JS压缩
var less = require('gulp-less'); //编译LESS文件
var autoprefixer = require('gulp-autoprefixer'); //自动为CSS添加前缀
var minifyCss = require('gulp-minify-css'); //CSS压缩
var imagemin = require('gulp-imagemin');    //图片压缩

var concat = require('gulp-concat'); //合并
var rev = require('gulp-rev'); //添加MD5后缀
var revCollector = require('gulp-rev-collector'); //路径替换
var gulpsync = require('gulp-sync')(gulp); //执行顺序  sync()同步  async()异步
var clean = require('gulp-clean'); //清除文件
// gulp-uglify gulp-autoprefixer gulp gulp-less gulp-concat gulp-connect
// gulp-rev gulp-rev-collector

// 文件加 MD5 hash 后缀
// gulp.task('uglify_js', function(){
//     gulp.src('src/less/*.less')
//         .pipe(uglify())
//         .pipe(rev())
//         .pipe(gulp.dest('build/less'))
//         .pipe(rev.manifest())
//         .pipe(gulp.dest('build/rev'));
// })
// 路径替换
// gulp.task('rev', function(){
//     gulp.src(['build/rev/*.json', 'src/demo.html'])
//         .pipe(revCollector())
//         .pipe(gulp.dest('build/'))
// })

// 创建本地服务器
gulp.task('server', function() {
    connect.server({
        name: 'DevelopServer',
        root: './',
        port: 1378,
        livereload: true
    });
});

// 复制 html
gulp.task('html', function() {
    gulp.src('src/*.html')
        .pipe(gulp.dest('temp'))
        .pipe(connect.reload());
})

// 编译 less 文件, 添加前缀, 复制文件
gulp.task('less', function() {
    return gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //对齐样式
            remove: true //移除无用的样式
        }))
        .pipe(gulp.dest('temp/css'))
        .pipe(connect.reload());
})

// 复制 js 文件
gulp.task('js', function() {
    gulp.src('src/js/*.js')
        .pipe(gulp.dest('temp/js'))
        .pipe(connect.reload());
})

// 压缩图片, 复制图片
gulp.task('image', function() {
    gulp.src('src/image/**/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('temp/image'))
});

// 监听 html, css, js, image 修改变化
gulp.task('watch', function() {
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/less/*.less', ['less']);
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch('src/image/**/*)', ['image']);
})

// 清理临时文件
gulp.task('clean', function(){
    return  gulp.src('temp', {read: false})
                .pipe(clean());
})

gulp.task('rev', function(){
    gulp.src('temp/**/*')
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('temp'));
})


gulp.task('copy', gulpsync.sync(['html', 'less', 'js', 'image']));
gulp.task('dev', gulpsync.async(['server', 'copy', 'watch']));
