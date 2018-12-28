// @ts-check
const yargs = require('yargs');
const color = require('colors');
const { EnvVariable } = require('./constants');
const options = require('./lib/options');

module.exports = exports = yargs
  .usage('Usage: $0 [options]')
  .options(options)
  .help()
  .argv
;
