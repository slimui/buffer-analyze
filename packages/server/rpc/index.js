const { rpc } = require('@bufferapp/micro-rpc');
const checkToken = require('./checkToken');
const loginMethod = require('./login');
const logoutMethod = require('./logout');
const profilesMethod = require('./profiles');
const userMethod = require('./user');
const performanceTrackingMethod = require('./performanceTracking');
const summary = require('./summary');
const analyticsStartDate = require('./analyticsStartDate');

module.exports = checkToken(rpc(
  loginMethod,
  logoutMethod,
  profilesMethod,
  userMethod,
  performanceTrackingMethod,
  summary,
  analyticsStartDate,
));
