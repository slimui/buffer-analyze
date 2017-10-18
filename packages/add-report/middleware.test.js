import { actions } from '@bufferapp/async-data-fetch';
import middleware from './middleware';
import { actionTypes } from './actions';

describe('middleware', () => {
  const next = jest.fn();
  const state = {
    profiles: {
      selectedProfileId: '12359182129asd',
    },
  };
  const store = {
    dispatch: jest.fn(),
    getState: jest.fn(() => state),
  };
  it('should exist', () => {
    expect(middleware).toBeDefined();
  });

  it('should keep propagating the action through the chain', () => {
    const action = {
      type: 'TEST',
    };
    middleware(store)(next)(action);
  });

  it('shoud dispatch a data fetch for top posts once a profile has been selected', () => {
    const action = {
      type: actionTypes.CREATE_REPORT,
      chart_id: 'summary-table',
      name: 'Weekly Sync Report',
    };
    middleware(store)(next)(action);
    expect(store.dispatch).toHaveBeenCalledWith(actions.fetch({
      name: 'create_report',
      args: {
        profileId: '12359182129asd',
        chartId: 'summary-table',
        name: 'Weekly Sync Report',
      },
    }));
    expect(next).toHaveBeenCalledWith(action);
  });
});
