/* const superb = require('superb');
const fs = require('fs');
const plist = require('plist'); */

const { getPackageName, getWorkspaceExists } = require('./utils');

const packageName = getPackageName();

const workspaceExists = getWorkspaceExists();

const defaultExtensionPostfix = 'ExampleExtension';

module.exports = {
  templateOptions: {
    context: {
      // inflection
    },
  },
  prompts: {
    APP_IDENTIFIER: {
      message: 'What app identifier are you using?',
      default: 'com.exampleCompany.exampleApp',
      store: true,
    },
    ENABLE_BUGSNAG: {
      message: 'Do you want to use Bugsnag for crash reporting?',
      type: 'confirm',
      default: false,
      store: true,
    },
    BUGSNAG_API_KEY: {
      message: 'What is your Bugsnag API key?',
      default: 'exampleBugsnagKey123',
      when: answers => answers.ENABLE_BUGSNAG,
      store: true,
    },
    ENABLE_WORKSPACES: {
      message: "Are you planning to use iOS Workspaces (most common if you're using Cocoapods)?",
      type: 'confirm',
      when: () => !workspaceExists,
      store: true,
    },
    ENABLE_TEAMS: {
      message: 'Are you a member of more than one development team?',
      type: 'confirm',
      default: false,
      store: true,
    },
    TEAM_NAME: {
      message: 'Whats the name of the development team for this app?',
      when: answers => answers.ENABLE_TEAMS,
      store: true,
    },
    EXTENSION_POSTFIX: {
      message: "(Ignore if you don't use iOS extensions) Name one Extensions App Identifier suffix",
      default: defaultExtensionPostfix,
      store: true,
    },
    MATCH_GIT_URL: {
      message: 'URL to Match Git Repository - used to store certificates',
      store: true,
    },
    ENABLE_SUPPLY_JSON_KEY: {
      message: 'Do you want to setup Supply to upload Android builds to Google Play? Follow these instructions https://docs.fastlane.tools/getting-started/android/setup/#setting-up-supply:',
      default: false,
      type: 'confirm',
      store: true,
    },
    SUPPLY_JSON_KEY: {
      message: 'Environment variable pointing out your Supply Json file: ',
      when: answers => answers.ENABLE_SUPPLY_JSON_KEY,
      store: true,
    },
    ENABLE_ITC_PROVIDER: {
      message: 'Do you need to specify an ITC Provider?',
      type: 'confirm',
      store: true,
    },
    PILOT_ITC_PROVIDER: {
      message: 'Whats your ITC Provider?',
      when: answers => answers.ENABLE_ITC_PROVIDER,
      store: true,
    },
    SIGNING_IDENTITY: {
      message: 'Whats your signing identity?',
      store: true,
    },
    /* INCLUDE_SAMPLE_CONFIG_IMPLEMENTATION: {
      message: 'Add sample se
      tup for different runtime configurations (including a few different app identifiers)',
      type: 'confirm',
      default: true,
      store: true,
    }, */
  },
  enforceCurrentFolder: true,
  data: (answers) => {
    console.log(answers);
    return ({
      ...answers,
      PROJECT_NAME: packageName,
      ENABLE_WORKSPACES: workspaceExists || answers.ENABLE_WORKSPACES,
      HAS_EXTENSION_POSTFIX: answers.EXTENSION_POSTFIX !== defaultExtensionPostfix,
      INCLUDE_SAMPLE_CONFIG_IMPLEMENTATION: true,
    });
  },
  move: {
    gitignore: '.gitignore',
  },
  /* filter: {
    config: 'INCLUDE_SAMPLE_CONFIG_IMPLEMENTATION',
  }, */
  showTip: true,
  gitInit: false,
};
