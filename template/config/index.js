import DeviceInfo from 'react-native-device-info';

const appId = DeviceInfo.getBundleId();

/* eslint-disable global-require, no-nested-ternary */
const config = appId.indexOf('.development') > -1 ? require('./env.development') :
  appId.indexOf('.test') > -1 ? require('./env.test') :
    require('./env.production');
/* eslint-enable */

module.exports = config;
