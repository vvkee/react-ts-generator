const shell = require('shelljs');
const fs = require('fs');
const config = require('./config');

module.exports = () => {
  if (fs.existsSync(config.path.dist)) {
    shell.rm('-R', config.path.dist);
  }
}
