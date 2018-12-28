const K = require('kefir');
const R = require('ramda');
const L = require('partial.lenses');

module.exports = exports = {};

// #region [ Kefir ]
const _activator = () => {};

const activate = obs => obs.onEnd(_activator);
const deactivate = obs => obs.offEnd(_activator);

exports.activate = activate;
exports.deactivate = deactivate;
// #endregion
// #region [ Lenses ]
const Transform = {
  toSnake: [
    L.seq([
      L.elems, L.modifyOp(R.toLower),
      L.modifyOp(R.join('_')),
    ]),
  ],
  toCamel: [
    L.slice(1, Infinity),
    L.elems,
    L.seq(
      [L.first, L.modifyOp(R.toUpper)],
      L.modifyOp(R.join('')),
    ),
    L.modifyOp(R.join('')),
  ],
};

const andJoinWith = R.curryN(2, (sep, tfn) => L.seq(tfn, L.modifyOp(R.join(sep))));
const andJoin = andJoinWith('');
const andSnake = andJoinWith('_');

const transformTokens = L.transform;
// #endregion
// #region [ Strings ]
const snakeToTokens = R.split('_');
const tokensToSnake = transformTokens(andSnake(Transform.toSnake));
const tokensToCamel = transformTokens(andJoin(Transform.toCamel));

exports.snakeToTokens = snakeToTokens;
exports.tokensToSnake = tokensToSnake;
exports.tokensToCamel = tokensToCamel;
// #endregion
