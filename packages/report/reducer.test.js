import { actionTypes as asyncDataFetchActions } from '@bufferapp/async-data-fetch';
import reducer, { actions, actionTypes } from './reducer';
import { DIRECTION_UP, DIRECTION_DOWN } from './middleware';

describe('reducer', () => {
  describe('initial state', () => {
    it('is loading', () => {
      const state = reducer(undefined, {});
      expect(state.loading).toBeTruthy();
    });
    it('has no name', () => {
      const state = reducer(undefined, {});
      expect(state.name).toBe('');
    });
    it('has no charts', () => {
      const state = reducer(undefined, {});
      expect(state.charts).toHaveLength(0);
    });
    it('is not in edit mode', () => {
      const state = reducer(undefined, {});
      expect(state.edit).toBeFalsy();
    });
  });

  it('receives the name when a new report is selected', () => {
    const state = reducer(undefined, {
      type: `get_report_${asyncDataFetchActions.FETCH_START}`,
      args: {
        name: 'A new report',
      },
    });
    expect(state.name).toBe('A new report');
  });

  describe('FETCH_SUCCESS', () => {
    it('stops loading', () => {
      const state = reducer(undefined, {
        type: `get_report_${asyncDataFetchActions.FETCH_SUCCESS}`,
        result: {
          name: 'A new report',
        },
      });
      expect(state.loading).toBeFalsy();
    });
    it('stores the retrieved chart information', () => {
      const state = reducer(undefined, {
        type: `get_report_${asyncDataFetchActions.FETCH_SUCCESS}`,
        result: {
          charts: ['a chart', 'another chart'],
        },
      });
      expect(state.charts).toEqual(['a chart', 'another chart']);
    });
  });

  it('EDIT_NAME sets edit mode', () => {
    const state = reducer(undefined, {
      type: actionTypes.EDIT_NAME,
    });
    expect(state.edit).toBeTruthy();
  });

  describe('SAVE_CHANGES', () => {
    it('removes edit mode', () => {
      const initialState = reducer(undefined, {});
      const state = reducer(initialState, {
        type: actionTypes.SAVE_CHANGES,
      });
      expect(state.edit).toBeFalsy();
    });
    it('stores the new name', () => {
      const initialState = reducer(undefined, {});
      const state = reducer(initialState, {
        type: actionTypes.SAVE_CHANGES,
        name: 'a new name',
      });
      expect(state.name).toBe('a new name');
    });
  });

  it('updating the date range on a report sets its state to loading', () => {
    const state = reducer(undefined, {
      type: `update_report_${asyncDataFetchActions.FETCH_START}`,
      args: {
        dateRange: {
          startDate: 'yesterday',
          endDate: 'today',
        },
      },
    });

    expect(state.loading).toBeTruthy();
  });

  describe('deleting and moving charts', () => {
    let initialState = null;

    beforeEach(() => {
      initialState = reducer({
        charts: [{
          _id: 1,
        }, {
          _id: 2,
        }],
      }, {});
    });

    it('delete chart removes chart with that ID once the server has responded correctly', () => {
      const state = reducer(initialState, {
        type: `delete_chart_${asyncDataFetchActions.FETCH_SUCCESS}`,
        args: {
          chartId: 2,
        },
      });
      expect(state.charts).toEqual([{
        _id: 1,
      }]);
    });

    it('moves chart when move_chart_FETCH_START happens', () => {
      const state = reducer(initialState, {
        type: `move_chart_${asyncDataFetchActions.FETCH_START}`,
        args: {
          direction: DIRECTION_UP,
          chartId: 2,
        },
      });

      const chartIds = state.charts.map(chart => chart._id);

      expect(chartIds).toEqual([2, 1]);
    });

    it('triggering the opposite moves on the same charts leads to the same order', () => {
      const state = reducer(initialState, {
        type: `move_chart_${asyncDataFetchActions.FETCH_START}`,
        args: {
          direction: DIRECTION_UP,
          chartId: 2,
        },
      });
      const stateWithChartsBackToNormal = reducer(state, {
        type: `move_chart_${asyncDataFetchActions.FETCH_START}`,
        args: {
          direction: DIRECTION_DOWN,
          chartId: 2,
        },
      });

      expect(initialState.charts).toEqual(stateWithChartsBackToNormal.charts);
    });

    describe('should revert move if fetch fails', () => {
      it('move up should revert by moving back down', () => {
        const state = reducer(initialState, {
          type: `move_chart_${asyncDataFetchActions.FETCH_START}`,
          args: {
            direction: DIRECTION_UP,
            chartId: 2,
          },
        });
        const revertedState = reducer(state, {
          type: `move_chart_${asyncDataFetchActions.FETCH_FAIL}`,
          args: {
            direction: DIRECTION_UP,
            chartId: 2,
          },
        });

        expect(revertedState.charts).toEqual(initialState.charts);
      });

      it('move down should revert by moving back up', () => {
        const state = reducer(initialState, {
          type: `move_chart_${asyncDataFetchActions.FETCH_START}`,
          args: {
            direction: DIRECTION_DOWN,
            chartId: 1,
          },
        });
        const revertedState = reducer(state, {
          type: `move_chart_${asyncDataFetchActions.FETCH_FAIL}`,
          args: {
            direction: DIRECTION_DOWN,
            chartId: 1,
          },
        });

        expect(revertedState.charts).toEqual(initialState.charts);
      });
    });
  });

  describe('actions', () => {
    it('editName', () => {
      expect(actions.editName()).toEqual({
        type: actionTypes.EDIT_NAME,
      });
    });
    it('saveChanges', () => {
      expect(actions.saveChanges({
        name: 'a new name',
      })).toEqual({
        type: actionTypes.SAVE_CHANGES,
        name: 'a new name',
      });
    });
    it('moveUp', () => {
      expect(actions.moveUp('chart-123')).toEqual({
        type: actionTypes.MOVE_CHART_UP,
        chartId: 'chart-123',
      });
    });
    it('moveDown', () => {
      expect(actions.moveDown('chart-123')).toEqual({
        type: actionTypes.MOVE_CHART_DOWN,
        chartId: 'chart-123',
      });
    });
    it('deleteChart', () => {
      expect(actions.deleteChart('chart-123')).toEqual({
        type: actionTypes.DELETE_CHART,
        chartId: 'chart-123',
      });
    });
  });
});
