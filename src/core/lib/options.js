// @ts-check
const color = require('colors');
const { EnvVariable } = require('../constants');

module.exports = exports = {};

exports['env-access-token'] = {
  default: false,
  describe: [
    'Use access token from environment variable ',
    `(${color.bold(EnvVariable.TWITCH_OAUTH_TOKEN)}) `,
    'instead of requesting it from the API.',
  ].join(''),
};
