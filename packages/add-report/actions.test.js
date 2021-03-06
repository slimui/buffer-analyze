import { actions, actionTypes } from './actions';

describe('actions', () => {
  it('createReport triggers CREATE_REPORT with name and chartId', () => {
    const name = 'Weekly Sync';
    const chartId = 'summary-table';
    expect(actions.createReport(name, chartId)).toEqual({
      type: actionTypes.CREATE_REPORT,
      name,
      chart_id: chartId,
      state: {},
    });
  });

  it('createReport triggers CREATE_REPORT and passes state if provided', () => {
    const name = 'Weekly Sync';
    const chartId = 'summary-table';
    const state = {
      key: 'value',
    };
    expect(actions.createReport(name, chartId, state)).toEqual({
      type: actionTypes.CREATE_REPORT,
      name,
      state,
      chart_id: chartId,
    });
  });
  it('addToReport triggers ADD_TO_REPORT', () => {
    const reportId = 'report-123';
    const chartId = 'summary-table';
    const state = {
      key: 'value',
    };
    expect(actions.addToReport(reportId, chartId, state)).toEqual({
      type: actionTypes.ADD_TO_REPORT,
      reportId,
      state,
      chart_id: chartId,
    });
  });
});
