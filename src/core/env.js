// @ts-check
const log = require('npmlog');

log.heading = 'env';

module.exports = exports = {};

exports.clientId = process.env.TWITCH_CLIENT_ID;
exports.clientSecret = process.env.TWITCH_CLIENT_SECRET;

//

exports.hasValidEnvironment = () => !!(exports.clientId && exports.clientSecret);
