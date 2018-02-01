/* eslint-disable import/first */
import moment from 'moment';

jest.mock('micro-rpc-client');
jest.mock('request-promise');
import rp from 'request-promise';

jest.mock('../summary');
import summary from '../summary';
import getReport from './';

describe('rpc/get_report', () => {
  const token = 'some token';
  const session = {
    session: {
      accessToken: token,
    },
  };
  const id = 'report-1235asd';

  const report = {
    id,
    charts: [
      {
        chart_id: 'summary-table',
        profile_id: '12351wa',
        service: 'facebook',
      },
      {
        chart_id: 'deprecated-chart',
        profile_id: '12351wa',
        service: 'facebook',
      },
      {
        chart_id: 'summary-table',
        profile_id: '12351xa',
        service: 'facebook',
      },
    ],
  };

  beforeEach(() => {
    rp.mockReturnValueOnce(Promise.resolve(report));
  });

  it('should have the expected name', () => {
    expect(getReport.name)
      .toBe('get_report');
  });

  it('should have the expected docs', () => {
    expect(getReport.docs)
      .toBe('get report details');
  });

  it('should request chart data for every chart on the argument list', async () => {
    const endDate = moment().subtract(1, 'days').unix();
    const startDate = moment().subtract(7, 'days').unix();
    summary.fn = jest.fn();
    summary.fn.mockReturnValueOnce(Promise.resolve([]));

    await getReport.fn({ startDate, endDate, _id: id }, { session });

    expect(summary.fn.mock.calls[0])
      .toEqual([{
        profileId: '12351wa',
        profileService: 'facebook',
        startDate,
        endDate,
      }, { session }]);
  });

  it('returns chart data for each chart as a "metrics" key', async () => {
    const endDate = moment().subtract(1, 'days').unix();
    const startDate = moment().subtract(7, 'days').unix();
    const metrics = [1, 2, 3, 4];
    summary.fn = jest.fn();
    summary.fn.mockReturnValueOnce(Promise.resolve(metrics));

    const result = await getReport.fn({ startDate, endDate, _id: id }, { session });

    expect(result.charts[0].metrics).toEqual(metrics);
  });

  it('if chart metrics is an object with a metrics attribute, we merge the full object into the chart', async () => {
    const endDate = moment().subtract(1, 'days').unix();
    const startDate = moment().subtract(7, 'days').unix();
    const metricsEmbeddedInObject = {
      metrics: [1, 2, 3, 4],
      posts: ['a post', 'another post'],
    };
    summary.fn = jest.fn();
    summary.fn.mockReturnValueOnce(Promise.resolve(metricsEmbeddedInObject));

    const result = await getReport.fn({ startDate, endDate, _id: id }, { session });

    expect(result.charts[0].metrics).toEqual(metricsEmbeddedInObject.metrics);
    expect(result.charts[0].posts).toEqual(metricsEmbeddedInObject.posts);
  });

  it('destructures over state as arguments for the charts rpc method', async () => {
    const endDate = moment().subtract(1, 'days').unix();
    const startDate = moment().subtract(7, 'days').unix();
    const metricsEmbeddedInObject = {
      metrics: [1, 2, 3, 4],
      posts: ['a post', 'another post'],
    };
    summary.fn = jest.fn();
    summary.fn.mockReturnValueOnce(Promise.resolve(metricsEmbeddedInObject));

    await getReport.fn({ startDate, endDate, _id: id }, { session });

    expect(summary.fn.mock.calls[0][0]).toEqual({
      profileId: '12351wa',
      profileService: 'facebook',
      endDate,
      startDate,
    });
  });

  it('assigns chart state to the chart response', async () => {
    const endDate = moment().subtract(1, 'days').unix();
    const startDate = moment().subtract(7, 'days').unix();
    const metricsEmbeddedInObject = {
      metrics: [1, 2, 3, 4],
      posts: ['a post', 'another post'],
    };
    summary.fn = jest.fn();
    summary.fn.mockReturnValueOnce(Promise.resolve(metricsEmbeddedInObject));

    const response = await getReport.fn({ startDate, endDate, _id: id }, { session });

    expect(response.charts[0]).toEqual({
      ...report.charts[0],
      ...report.charts[0].state,
      ...metricsEmbeddedInObject,
    });
  });

  it('prunes unsupported charts', async () => {
    const endDate = moment().subtract(1, 'days').unix();
    const startDate = moment().subtract(7, 'days').unix();
    const metrics = [1, 2, 3, 4];
    const reports = {
      id,
      charts: [
        {
          chart_id: 'deprecated-chart',
          profile_id: '12351wa',
          service: 'facebook',
        },
        {
          chart_id: 'summary-table',
          profile_id: '12351wa',
          service: 'facebook',
        },
      ],
    };

    rp.mockReturnValue(Promise.resolve(reports));
    summary.fn = jest.fn();
    summary.fn.mockReturnValue(Promise.resolve(metrics));

    const result = await getReport.fn({ startDate, endDate, _id: id }, { session });

    expect(result.charts.length).toEqual(2);
  });
});
