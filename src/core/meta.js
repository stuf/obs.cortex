const U = require('karet.util');
const L = require('partial.lenses');

module.exports = exports = {};

//

const oauthPrefix = 'oauth';

const tokenIn = U.view([oauthPrefix, 'token']);
const expirationDateIn = U.view([oauthPrefix, 'expiresAt']);

exports.tokenIn = tokenIn;
exports.expirationDateIn = expirationDateIn;

//
