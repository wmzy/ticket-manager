const path = require('path');
const Promise = require('bluebird');
const glob = require('glob');

exports.requireGlob = async function (pattern) {
  return new Promise((resolve, reject) => {
    glob(pattern, {cwd: path.join(__dirname, '..')}, (e, paths) => {
      if (e) return reject(e);
      try {
        paths.forEach(p => require(path.resolve(p)));
      } catch (e) {
        return reject(e);
      }

      resolve();
    });
  })
};

