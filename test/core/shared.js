const test = require('ava');

const P = require('../../src/core/shared');

test('tokensToCamel', t => {
  t.is('fooBar', P.tokensToCamel(['foo', 'bar']));
});

test('tokensToSnake', t => {
  t.is('foo_bar', P.tokensToSnake(['foo', 'bar']));
});
