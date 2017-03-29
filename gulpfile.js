var gulp = require('gulp')
var GulpSSH = require('gulp-ssh')

var sshConfig = {
    host: '192.168.1.112',
    port: 12188,
    username: 'root',
    password: 'top2016'
}

var sshDevConfig = {
    host: '139.196.100.134',
    port: 22,
    username: 'root',
    password: 'Hifox@2017'
}


var  gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: sshConfig
})


var  gulpDevSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: sshDevConfig
})


//打包112到服务器
gulp.task('deployDev', function () {
   return gulp
   //替换成你要发布的包 例如 dist/**
    .src(['./dist/index.html'])
    .pipe(gulpDevSSH.dest('/usr/local/apps/front/hicoach-dev'))
})



//打包112到服务器
gulp.task('deploy112', function () {
   return gulp
   //替换成你要发布的包 例如 dist/**
    .src(['./dist/**'])
    .pipe(gulpSSH.dest('/usr/local/apps/front/hicoach'))
})
