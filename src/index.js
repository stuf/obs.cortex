const U = require('karet.util');
const R = require('ramda');
const env = require('./core/env');
const { createClient, createEventProps } = require('./core/irc/index');
const api = require('./core/twitch/api');
const createState = require('./core/state');
const log = require('npmlog');
const color = require('colors');

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

  log.info('run', 'Creating state atom (verbose %s)', color.bold(argv.verbose || false));
  const state = createState({}, { verbose: argv.verbose });

  api.accessToken.onValue(v => U.view(['oauth', 'token'], state).set(v));
  api.tokenExpirationDate.onValue(v => U.view(['oauth', 'expiresAt'], state).set(v))

  // We need to wait to get the access token to be able to connect to IRC
  const clientConfig = U.thru(
    api.accessToken,
    U.takeFirst(1),
    U.mapValue(token => ({
      server: 'irc.twitch.tv',
      nickName: 'piparkaq',
      password: `oauth:${token}`,
      channels: ['#piparkaq'],
    }))
  );

  const client = U.mapValue(createClient, clientConfig);

  clientConfig.log('client config');
  client.log('client');
}

exports.run = run;
