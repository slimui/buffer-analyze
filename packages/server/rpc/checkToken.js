const ObjectPath = require('object-path');
const {
  json,
  createError,
} = require('micro');

const whitelistedRPCNames = [
  'methods',
];

module.exports = next => async (req, res) => {
  const data = await json(req);
  const { name } = data;
  if (
    whitelistedRPCNames.includes(name) ||
    ObjectPath.has(req, 'session.analyze')
  ) {
    return next(req, res);
  }
  const errorMessage = 'Unauthorized';
  res.statusMessage = errorMessage;
  throw createError(401, errorMessage);
};
