const gulp = require('gulp');
const webpack = require('webpack');
const nodemon = require('nodemon');
const forever = require('forever');
const path = require('path');
let config = null;

if(process.env.NODE_ENV !== 'production'){
  config = require('./webpack.dev.js');
} else {
  config = require('./webpack.prod.js');
}

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
  };
}

gulp.task('build', function(done){
  webpack(config).run(onBuild(done));
});

gulp.task('watch', function(){
  webpack(config).watch(100, function(err, stats){
    onBuild()(err, stats);
    nodemon.restart();
  });
});

if(process.env.NODE_ENV !== 'production'){

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
      console.log("Restarted");
    });
  });
} else {

  gulp.task('run', function(){

    const options= {
      watch: false,
      sourceDir: path.join(__dirname, 'dist')
    };

    forever.start('server.js', options);
  });
}


