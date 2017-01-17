'use strict';
let nodemon = require('gulp-nodemon');

module.exports = function() {
  return function () {
    return nodemon({
      script: 'server/index.js',
      watch: ['server'],
      ignore: ['node_modules/**', '**/*.*___jb_tmp___'],
      execMap: {
        js: 'node --harmony'
      },
      ext: 'js html',
      env: {
        'NODE_ENV': 'development'
      }
    });
  };
};
