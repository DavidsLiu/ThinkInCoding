var gulp = require('gulp');
//文件删除
var del = require('del');
//多任务
var runSequence = require('run-sequence');
//压缩JS
var uglify = require('gulp-uglify');
//错误提示
var pump = require('pump');
//图片压缩
var imagemin = require('gulp-imagemin');
//js语法检测
var jslint = require('gulp-jslint');
//合并
var concat = require('gulp-concat');
//sourcemap
var sourcemaps = require('gulp-sourcemaps');
//css前缀
var autoprefixer = require("gulp-autoprefixer");
//压缩css
var cleancss = require('gulp-clean-css');
//html
var html = require('gulp-htmlmin');
//css语法
var csslint = require("gulp-csslint");
//重命名
var rename = require('gulp-rename');
//静态资源的处理
var rev = require("gulp-rev");
var revCollector  = require('gulp-rev-collector');

//热更新
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;


//配置服务器
gulp.task('browser',function(){
  browserSync.init({
    server: {
      baseDir: './src'
    }
  });

  gulp.watch('src/*.html').on('change', reload);
  gulp.watch('src/js/*.js').on('change', reload);
  gulp.watch('src/css/*.css').on('change', reload);
});

/**
* 图片的处理:
* 1、图片的压缩
* 2、图片缓存处理
*/
gulp.task('img',function(cb){
  pump([
    gulp.src(['src/images/*.*'),
    imagemin(),
    rev(),
    gulp.dest('build/images'),
    rev.manifest(),
    gulp.dest('build/rev/images')
  ],cb);
});

//检测CSS代码是否规范
gulp.task('csslint',function(cb){
  pump([
    gulp.src('src/css/*.css'),
    csslint(),
    csslint.formatter()
  ],cb);
});
/*
    1、先开启sourcemaps
    2、加上前缀
    3、压缩css
    4、生成sourcemaps文件
*/
gulp.task('css',function(cb){
  pump([
    gulp.src('src/css/*.css'),
    sourcemaps.init(),
    autoprefixer(),
    cleancss(),
    sourcemaps.write('../map'),
    gulp.dest('build/css'),
  ],cb);
});
//给css加上hash，处理缓存问题
gulp.task('revcss',function(cb){
  pump([
    gulp.src('build/css/*.css'),
    rev(),
    gulp.dest('build/css'),
    rev.manifest(),
    gulp.dest('build/rev/css')
  ],cb);
});
/*
  js构建步骤：
  1、js语法检测.
  2、js压缩
  3、给js加上hash，处理缓存问题
*/

//语法检测
gulp.task('jslint',function(cb){
  pump([
    gulp.src(['src/js/*.js']),
    jslint(),
    jslint.reporter('default')
  ],cb);
});

//压缩
gulp.task('js',function(cb){
  pump([
    gulp.src(['src/js/*.js']),
    sourcemaps.init(),
    uglify(),
    sourcemaps.write('../map'),
    gulp.dest('build/js')
  ],cb);
});


//js加上hash
gulp.task('revjs',function(cb){
  pump([
    gulp.src('build/js/*.js'),
    rev(),
    gulp.dest('build/js'),
    rev.manifest(),
    gulp.dest('build/rev/js')
  ],cb);
});


//html css中的各种映射关系
gulp.task('revhtml',function(cb){
  pump([
    gulp.src(['build/rev/*/*.json','src/*.html']),
    revCollector(),
    html({collapseWhitespace: true}), //压缩html文件
    gulp.dest('build/'),
    gulp.src(['build/rev/images/*.json','build/css/*.css']),
    revCollector(),
    gulp.dest('build/css')
  ],cb);
});

//删除无用的文件
gulp.task('deltemp',function(cb){
  del([
    'build/rev',
    'build/css/*.css',
    '!build/css/*-*.css',
    'build/js/*.js',
    '!build/js/*-*.js'
  ],cb)
});

gulp.task('dev',function(done){
  runSequence('img',['csslint','jslint'],['css','js'],['revcss','revjs'],'revhtml','deltemp',done);
});

//生成sourcemaps
/*
  第一种
  sourcemaps.init() sourcemaps.write() 映射文件生成在源文件中

  第二种
  sourcemaps.init() sourcemaps.write('../maps') 映射文件生成在源文件的上级目录的maps文件夹中.后缀多一个.map
*/
