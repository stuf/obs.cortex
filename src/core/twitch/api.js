const K = require('kefir');
const R = require('ramda');
const A = require('axios').default;
const U = require('karet.util');
const L = require('partial.lenses');
const { formatDistance, addSeconds } = require('date-fns/fp');

const env = require('../env');
const state = require('../state');
const { TwitchApi } = require('../constants');

module.exports = exports = {};

//

const Method = {
  GET: 'GET',
  POST: 'POST',
};

//

const client_ = A.create({ baseURL: TwitchApi.baseURL });

client_.defaults.headers['Accept'] = 'application/vnd.twitchtv.v5+json';
client_.defaults.headers['Client-ID'] = env.clientId;

//

const perform = options => K.fromPromise(client_(options));

exports.perform = perform;

//

const defaultScopes = ['chat:read', 'chat:edit'];

const authenticate = (scopes = defaultScopes) =>
  perform({
    method: Method.POST,
    url: '/oauth2/token',
    params: {
      grant_type: 'client_credentials',
      client_secret: env.clientSecret,
      scope: scopes.join(' '),
    },
  });

const authResponse = U.mapValue(L.get('data'), authenticate());

const accessToken = U.mapValue(L.get('access_token'), authResponse);
const tokenValidityTime = U.mapValue(L.get('expires_in'), authResponse);

exports.authenticate = authenticate;
exports.accessToken = accessToken;
exports.tokenValidityTime = tokenValidityTime;

//

const tokenExpirationDate = U.combine(
  [tokenValidityTime, new Date()],
  addSeconds,
);

exports.tokenExpirationDate = tokenExpirationDate;

//

const ircOauthToken = U.mapValue(R.concat('oauth:'), accessToken);
exports.ircOauthToken = ircOauthToken;
