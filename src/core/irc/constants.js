// @ts-check
module.exports = exports = {};

//

const Event = {
  JOIN: ['join', ['channel', 'message']],
  RAW: ['raw', ['message']],
};

exports.Event = Object.freeze(Event);
