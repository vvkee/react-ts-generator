const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const config = require('./config');

/**
 * @description 读取文件并注入文本
 * @param { string } projectName 
 * @param { string } projectDescription 
 * @param { string } projectAuthor 
 */
const readTemplateFile = (
  {
    projectName,
    projectDescription,
    projectAuthor
  },
  targetPath,
  distPath
) => new Promise((resolve, reject) => {
  fs.readFile(
    targetPath,
    'utf8',
    (err, data) => {
      if (err) {
        reject(err);
      }
      const str = ejs.render(data, {
        project_name: projectName,
        project_description: projectDescription,
        project_author: projectAuthor
      })
      resolve({
        str,
        distPath
      });
    }
  )
});

/**
 * @description 重新写入文本
 * @param { string } str 
 */
const writeFile = (str, targetPath) => new Promise((resolve, reject) => {
  fs.writeFile(
    targetPath,
    str,
    'utf8', (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    }
  );
});

module.exports = async ({ projectName, projectDescription, projectAuthor }) => {
  const coreFiles = ['package.json'];
  const websiteFiles = ['babel.config.js', 'package.json', 'tsconfig.json', 'webpack.dev.config.js'];

  const readPromises = coreFiles.map((file) => readTemplateFile(
    {
      projectName,
      projectDescription,
      projectAuthor
    },
    path.resolve(config.path.template, file),
    path.resolve(config.path.dist, file)
  )).concat(websiteFiles.map((file) => readTemplateFile(
    {
      projectName,
      projectDescription,
      projectAuthor
    },
    path.resolve(config.path.website, file),
    path.resolve(config.path.dist, `./website/${file}`)
  )));

  const readResults = await Promise.all(readPromises);
  const writePromises = readResults.map((res) => writeFile(res.str, res.distPath));
  await Promise.all(writePromises);
}