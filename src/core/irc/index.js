const K = require('kefir');
const R = require('ramda');
const U = require('karet.util');
const L = require('partial.lenses');
const log = require('npmlog');
const { Client } = require('irc-upd');
const { Event } = require('./constants');
const defaults = require('./defaults');
const { validateConfig } = require('./validate');
const { ExitCode } = require('../constants');

log.heading = 'irc';

module.exports = exports = {};

// Client /////////////////////////////////////////////////////////////

/**
 * @param {IrcClientConfig} config
 */
const createClient = (config = {}) => {
  const clientConfig = R.merge(defaults, config);
  // Try and validate the given config
  try {
    validateConfig(clientConfig);
  }
  catch (err) {
    log.error('validate', 'Configuration is invalid');
    log.error('validate', 'The following invalid values were found in the configuration given:');
    const errs = L.collect([L.json(), L.entries], err.message);
    errs.forEach(([k, v]) => log.error('validate', '  - %s => %s', k, v));

    process.exit(ExitCode.CONFIGURATION_INVALID);
  }

  const client = new Client(
    clientConfig.server,
    clientConfig.nickName,
    {
      userName: clientConfig.userName,
      realName: clientConfig.realName,
      channels: clientConfig.channels || [],
      password: clientConfig.password,
    },
  );

  const rawMessage = U.thru(
    U.fromEvents(client, 'raw'),
    U.toProperty,
  );

  return {
    client,
    rawMessage,
  };
};

exports.createClient = createClient;

// Commands ///////////////////////////////////////////////////////////

const command = {};

exports.command = command;

// Events /////////////////////////////////////////////////////////////

const createEventStream = (client, [event, keys]) => U.thru(
  K.fromEvents(
    client,
    event,
    R.compose(R.zipObj(keys), R.unapply(R.identity)),
  ),
  U.toProperty,
  U.mapValue(L.set('type', event)),
);

/**
 * @param {Client} client
 */
const createEventProps = client => {
  const events = {
    JOIN: createEventStream(client, Event.JOIN),
    RAW: createEventStream(client, Event.RAW),
  };

  return events;
};

exports.createEventProps = createEventProps;

//

/**
 * @typedef {object} IrcClientConfig
 * @prop {string} server
 * @prop {string} username
 * @prop {string} password
 * @prop {string[]} channels
 */
