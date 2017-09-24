const gulp = require('gulp');
const webpack = require('webpack');
const nodemon = require('nodemon');
const path = require('path');

if(process.env.NODE_ENV !== 'production'){
  console.log("devvv");
} else {
  console.log("proddd");
}

const webpackDevConfig = require('./webpack.dev.js');

function onBuild(done){
  return function(err, stats){
    if(err){
      console.log("Error", err);
    } else {
      console.log(stats.toString());
    }
    if(done){
      done();
    }
  }
}

gulp.task('build', function(done){
  webpack(webpackDevConfig).run(onBuild(done));
});

gulp.task('watch', function(){
  webpack(webpackDevConfig).watch(100, function(err, stats){
    onBuild()(err, stats);
    nodemon.restart();
  });
});

gulp.task('run', ['watch'], function(){
  nodemon({
    execMap:{
      js:'node'
    },
    script: path.join(__dirname, 'dist/server'),
    ignore:['*'],
    watch:['foo/'],
    ext: 'noop'
  }).on('restart', function(){
    console.log("Restarted")
  });
});
