const path = require('path');
const ncu = require('npm-check-updates');
const config = require('./config');

module.exports = async () => {
  await Promise.all([
    ncu.run({
      packageFile: path.resolve(config.path.dist, './package.json'),
      silent: true,
      jsonUpgraded: true
    }),
    ncu.run({
      packageFile: path.resolve(config.path.dist, './website/package.json'),
      silent: true,
      jsonUpgraded: true
    })
  ])
};
