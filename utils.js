const process = require('process');
const fs = require('fs');

const getPackageName = () => {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const pkg = require(`${process.cwd()}/package.json`);

  return pkg.name;
};

const getWorkspaceExists = () => {
  const pathToWorkspace = `${process.cwd()}/ios/${getPackageName()}.xcworkspace`;

  return fs.existsSync(pathToWorkspace);
};

module.exports = {
  getPackageName,
  getWorkspaceExists,
};
