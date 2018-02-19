const process = require('process');
const fs = require('fs');

const getPackageName = () => {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const pkg = require(`${process.cwd()}/package.json`);

  return pkg.name;
};

const yarnLockExists = () => {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const pathToYarnLock = `${process.cwd()}/yarn.lock`;

  return fs.existsSync(pathToYarnLock);
};

const getWorkspaceExists = () => {
  const pathToWorkspace = `${process.cwd()}/ios/${getPackageName()}.xcworkspace`;

  return fs.existsSync(pathToWorkspace);
};

module.exports = {
  getPackageName,
  getWorkspaceExists,
  yarnLockExists,
};
