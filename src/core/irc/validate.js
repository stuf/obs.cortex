const R = require('ramda');
const V = require('partial.lenses.validation');

module.exports = exports = {};

//

const isNonEmpty = R.identity;
const isString = R.is(String);
const isIrcOauth = R.startsWith('oauth:');

const Message = {
  REQUIRED: 'Required',
  WRONG_FORMAT: 'Given value is of the wrong format',
  NOT_STRING: 'Must be a string',
};

//

const configRules = V.props({
  server: V.and(
    [isNonEmpty, Message.REQUIRED],
    [isString, Message.NOT_STRING],
  ),
  password: V.and(
    [isNonEmpty, Message.REQUIRED],
    [isString, Message.NOT_STRING],
    [isIrcOauth, Message.WRONG_FORMAT],
  ),
  nickName: V.and(
    [isNonEmpty, Message.REQUIRE],
    [isString, Message.NOT_STRING],
  ),
  realName: V.optional([isString, Message.NOT_STRING]),
  userName: V.optional([isString, Message.NOT_STRING]),
  channels: V.optional(V.arrayIx([isString, Message.NOT_STRING])),
});

exports.configRules = configRules;

//

const validateConfig = V.validate(configRules);

exports.validateConfig = validateConfig;
