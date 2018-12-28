const test = require('ava');
const K = require('kefir');

const P = require('../../src/core/shared');

// #region [ Kefir ]
test('property', t => {
  t.true(P.property() instanceof K.Property);
});

test('pool', t => {
  t.true(P.pool() instanceof K.Pool);
})
// #endregion

// #region [ Strings ]
test('tokensToCamel', t => {
  t.is('fooBar', P.tokensToCamel(['foo', 'bar']));
});

test('tokensToSnake', t => {
  t.is('foo_bar', P.tokensToSnake(['foo', 'bar']));
});

test('snakeToTokens', t => {
  t.deepEqual(['foo', 'bar'], P.snakeToTokens('foo_bar'));
});
// #endregion
