import DeviceInfo from 'react-native-device-info';

const appId = DeviceInfo.getBundleId();
const isEmulator = DeviceInfo.isEmulator();

/* eslint-disable global-require, no-nested-ternary */
function getConfig() {
  return isEmulator ? require('./env.emulator') :
    appId.includes('.production') ? require('./env.production') :
      appId.includes('.test') || appId.includes('.staging') ? require('./env.staging') :
        appId.includes('.development');
}
/* eslint-enable */

module.exports = getConfig();
