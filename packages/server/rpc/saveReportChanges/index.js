const { method } = require('@bufferapp/micro-rpc');
const rp = require('request-promise');

module.exports = method(
  'update_report',
  'save report changes',
  ({ name, id, dateRange }) =>
    rp({
      uri: `${process.env.ANALYZE_API_ADDR}/update_report`,
      method: 'POST',
      strictSSL: !(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'),
      body: {
        name,
        start_date: dateRange.startDate,
        end_date: dateRange.endDate,
        range: dateRange.range,
        id,
      },
      json: true,
    }).then(result => result)
  ,
);
