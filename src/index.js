const U = require('karet.util');
const L = require('partial.lenses');
const env = require('./core/env');
const api = require('./core/twitch/api');
const createState = require('./core/state');
const log = require('npmlog');

log.heading = 'main';

module.exports = exports = {};

//

function run(argv) {
  log.info('run', 'Check for required environment');

  if (!env.hasValidEnvironment()) {
    log.error('run', 'Environment missing client ID and secret');
    process.exit(1);
  }

  log.info('run', 'Environment OK');

  const state = createState({}, { verbose: argv.verbose });

  api.accessToken.onValue(v => U.view(['oauth', 'token'], state).set(v));
  api.tokenExpirationDate.onValue(v => U.view(['oauth', 'expiresAt'], state).set(v))
}

exports.run = run;
