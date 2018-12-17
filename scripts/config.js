const path = require('path');

module.exports = {
  path: {
    template: path.resolve(__dirname, '../template'),
    dist: path.resolve(process.cwd(), './.react-ts-generator-dist'),
    template: path.resolve(__dirname, '../template'),
    website: path.resolve(__dirname, '../template/website')
  }
}