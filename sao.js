/* const superb = require('superb');
const fs = require('fs');
const plist = require('plist'); */

const latinize = require('latinize');
const _ = require('lodash');
const yarnInstall = require('yarn-install');
const { getPackageName, getWorkspaceExists, yarnLockExists } = require('./utils');

_.extend(
  latinize.characters,
  {
    Ä: 'Ae',
    Ü: 'Ue',
    ä: 'ae',
    å: 'aa',
    Å: 'Aa',
    ö: 'oe',
    Ö: 'Oe',
    ü: 'ue',
  },
);

const packageName = getPackageName();

const workspaceExists = getWorkspaceExists();

const defaultExtensionPostfix = 'ExampleExtension';

let data;

module.exports = {
  templateOptions: {
    context: {
      // inflection
    },
  },
  prompts: {
    DISPLAY_NAME: {
      message: 'App Display Name:',
      default: packageName,
      store: true,
    },
    APP_IDENTIFIER: {
      message: 'App Identifier:',
      default: 'com.exampleCompany.exampleApp',
      store: true,
    },
    ENABLE_TEAMS: {
      message: 'Are you a member of more than one development team?',
      type: 'confirm',
      default: false,
      store: true,
    },
    TEAM_NAME: {
      message: 'Enter team name for this app:',
      when: answers => answers.ENABLE_TEAMS,
      store: true,
    },
    HAS_EXTENSION_SUFFIX: {
      message: 'Enable iOS extension support?',
      type: 'confirm',
      default: false,
      store: true,
    },
    EXTENSION_SUFFIX: {
      message: 'Name a Extension App Identifier Suffix to set up sample implementation:',
      default: defaultExtensionPostfix,
      store: true,
      when: answers => answers.HAS_EXTENSION_SUFFIX,
    },
    MATCH_GIT_URL: {
      message: 'URL to Match Git Repository:',
      store: true,
    },
    SUPPLY_JSON_KEY: {
      message: 'Environment variable pointing out your Supply Json file (if you need to set it up follow these instructions https://docs.fastlane.tools/getting-started/android/setup/#setting-up-supply):',
      store: true,
    },
    ENABLE_ITC_PROVIDER: {
      message: 'Do you need to specify an ITC Provider? Can happen if you have multiple teams',
      type: 'confirm',
      store: true,
      default: false,
      when: answers => answers.ENABLE_TEAMS,
    },
    PILOT_ITC_PROVIDER: {
      message: 'Whats your ITC Provider?',
      when: answers => answers.ENABLE_ITC_PROVIDER,
      store: true,
    },
    SIGNING_IDENTITY: {
      message: 'Signing identity (found in keychain):',
      store: true,
    },
    SUPPORT_MULTIPLE_APP_IDS: {
      message: 'Support multiple app identifiers?',
      type: 'confirm',
      default: true,
      store: true,
    },
    INCLUDE_SAMPLE_CONFIG_IMPLEMENTATION: {
      message: 'Add sample setup for different runtime configurations?',
      type: 'confirm',
      default: false,
      when: answers => answers.SUPPORT_MULTIPLE_APP_IDS,
    },
    ENABLE_BUGSNAG: {
      message: 'Enable Bugsnag?',
      type: 'confirm',
      default: false,
      store: true,
    },
    BUGSNAG_API_KEY: {
      message: 'Bugsnag API Key:',
      default: 'exampleBugsnagKey123',
      when: answers => answers.ENABLE_BUGSNAG,
      store: true,
    },
  },
  enforceCurrentFolder: true,
  data: (answers) => {
    const TEAM_NAME_ASCII = answers.TEAM_NAME ? latinize(answers.TEAM_NAME) : answers.TEAM_NAME;

    data = ({
      ...answers,
      PROJECT_NAME: packageName,
      ENABLE_WORKSPACES: workspaceExists,
      TEAM_NAME_ASCII,
    });

    return data;
  },
  post: (ctx) => {
    ctx.log.info('Making sure react-native-device-info is installed');
    yarnInstall(['react-native-device-info'], {
      respectNpm5: !yarnLockExists(),
    });

    if (data.TEAM_NAME_ASCII !== ctx.answers.TEAM_NAME) {
      ctx.log.info(`iTunes Connect team names are not supporting non-ascii characters. We've tried to convert it (we got ${data.TEAM_NAME_ASCII}) but please double-check on https://itunesconnect.apple.com/ that it's correctly set.`);
    }

    ctx.log.info(`Add the following to your 'app/build.gradle', before 'android {':
  ...
  def getVersionCode = { ->
    def code = project.hasProperty('buildNumber') ? buildNumber.toInteger() : -1
    println "VersionCode is set to $code"
    return code
  }

  def getVersionName = { ->
    def jsonFile = file('../../package.json')
    def parsedJson = new groovy.json.JsonSlurper().parseText(jsonFile.text)
    def versionName = parsedJson.version

    println "VersionName is set to $versionName"
    return versionName
  }
  ...`);

    ctx.log.info(`And inside 'defaultConfig {':
  ...
  versionCode getVersionCode()
  versionName getVersionName()
  ...
  `);

    if (data.SUPPORT_MULTIPLE_APP_IDS) {
      ctx.log.info(`before 'applicationVariants.all { variant ->':
  ...
  productFlavors{
    staging {
      applicationIdSuffix ".staging"
    }
    production{

    }
  }
  ...
`);
    }

    if (!process.env.MATCH_USERNAME || !process.env.FASTLANE_USER) {
      ctx.log.info(`
      It's recommended to add your username to your environment variables (so you don't get asked for it all the time), if you're using ~/.bash_profile:
      export MATCH_USERNAME=myappleid@myemailprovider.com
      export FASTLANE_USER=myappleid@myemailprovider.com
      `);
    }
  },
  move: {
    gitignore: '.gitignore',
  },
  filters: {
    'config/*.js': 'INCLUDE_SAMPLE_CONFIG_IMPLEMENTATION',
  },
  showTip: true,
  gitInit: false,
};
