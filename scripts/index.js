const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const shell = require('shelljs');
const path = require('path');
const config = require('./config');
const cleanDist = require('./clean-dist');
const copyTemplateToDist = require('./copy-template-to-dist');
const modifyDist = require('./modify-dist');
const updatePackageVersion = require('./update-package-version');

const init = () => {
  console.log(
    chalk.green(
      figlet.textSync('vvkee', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    )
  );
}

const askQuestions = () => {
  const questions = [{
      name: 'DIRNAME',
      type: 'input',
      message: 'What is the name of the Dir?'
    }, {
      name: 'PROJECT_NAME',
      type: 'input',
      message: 'What is the name of the project?'
    }, {
      name: 'PROJECT_DESCRIPTION',
      type: 'input',
      message: 'What is the description of the project?'
    }, {
      name: 'PROJECT_AUTHOR',
      type: 'input',
      message: 'Who is the author of the project?'
    }, {
      name: 'PROJECT_UPDATE',
      type: 'confirm',
      message: 'Do you update package that the versions is the newest?'
    }];
  return inquirer.prompt(questions);
};

const copyDirs = (dirName) => {
  const root = process.cwd();
  const filePath = `${process.cwd()}/${dirName}`;
  const tempPath = config.path.dist;
  shell.cp('-R', tempPath, filePath);
  return filePath;
};

const success = (filePath) => {
  console.log(
    chalk.white.bgGreen.bold(`Done! Project created at ${filePath}`)
  );
};


const run = async () => {
  init();
  cleanDist();
  const answers = await askQuestions();
  const { DIRNAME, PROJECT_NAME, PROJECT_DESCRIPTION, PROJECT_AUTHOR, PROJECT_UPDATE } = answers;
  copyTemplateToDist();
  await modifyDist({
    projectName: PROJECT_NAME,
    projectDescription: PROJECT_DESCRIPTION,
    projectAuthor: PROJECT_AUTHOR
  });
  if (PROJECT_UPDATE) {
    await updatePackageVersion();
  }
  const dirPath = copyDirs(DIRNAME);
  cleanDist();
  success(`create project success. The dir path is ${dirPath}`);
}

module.exports = run;
