const test = require('ava');
const K = require('kefir');

const P = require('../../src/core/shared');

// #region [ Kefir ]
test('property :: () -> Property', t => {
  t.true(P.property() instanceof K.Property);
});

test('pool :: () -> Pool', t => {
  t.true(P.pool() instanceof K.Pool);
})
// #endregion

// #region [ Strings ]
test('tokensToCamel :: [String] -> String', t => {
  t.is('fooBar', P.tokensToCamel(['foo', 'bar']));
});

test('tokensToSnake :: [String] -> String', t => {
  t.is('foo_bar', P.tokensToSnake(['foo', 'bar']));
});

test('snakeToTokens :: String -> [String]', t => {
  t.deepEqual(['foo', 'bar'], P.snakeToTokens('foo_bar'));
});
// #endregion
