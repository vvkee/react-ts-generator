const shell = require('shelljs');
const path = require('path');
const config = require('./config');

const distPath = config.path.dist;
const templatePath = config.path.template;

module.exports = () => {
  const root = process.cwd();
  shell.cp('-Rf', templatePath, distPath);
}
