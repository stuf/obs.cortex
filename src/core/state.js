const U = require('karet.util');

/**
 * @param {*} initial
 * @param {CreateStateOptions} options
 */
function createState(initial = {}, options = {}) {
  const state = U.atom(initial);

  if (options.verbose) {
    const log = require('npmlog');

    log.heading = 'state';

    // state.log('state');
    state.onValue(v => log.info('change', '%o', v));
  }

  return state;
}

module.exports = exports = createState;

//

/**
 * @typedef {object} CreateStateOptions
 * @prop {boolean} verbose
 */
