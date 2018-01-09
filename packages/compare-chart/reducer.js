import { actionTypes as asyncDataFetchActionTypes } from '@bufferapp/async-data-fetch';
import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('COMPARE_CHART', {
  SELECT_METRIC: 'SELECT_METRIC',
  SELECT_DAILY_MODE: 'SELECT_DAILY_MODE',
  TOGGLE_PREVIOUS_PERIOD: 'TOGGLE_PREVIOUS_PERIOD',
  OPEN_DROPDOWN: 'OPEN_DROPDOWN',
  CLOSE_DROPDOWN: 'CLOSE_DROPDOWN',
});

const initialState = {
  isDropdownOpen: false,
  loading: true,
  metrics: { totals: [], daily: [] },
  selectedMetricLabel: '',
  visualizePreviousPeriod: false,
  dailyMode: 0,
};

function isMetricValid(totals, metricLabel) {
  const metrics = totals.map(m => m.label);
  return metrics.indexOf(metricLabel) !== -1;
}

function getSelectedMetricLabelOnFetch(state, result) {
  const totals = result.totals;
  if (totals.length > 0) {
    if (state.selectedMetricLabel !== '' && isMetricValid(totals, state.selectedMetricLabel)) {
      return state.selectedMetricLabel;
    }
    return totals[0].label;
  }
  return '';
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `compare_${asyncDataFetchActionTypes.FETCH_START}`:
      return initialState;
    case `compare_${asyncDataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        loading: false,
        metrics: action.result,
        selectedMetricLabel: getSelectedMetricLabelOnFetch(state, action.result),
      };
    case `compare_${actionTypes.SELECT_METRIC}`:
      return Object.assign({}, state, {
        isDropdownOpen: false,
        selectedMetricLabel: action.metricLabel,
      });
    case `compare_${actionTypes.SELECT_DAILY_MODE}`:
      return Object.assign({}, state, {
        dailyMode: action.mode,
      });
    case `compare_${actionTypes.OPEN_DROPDOWN}`:
      return Object.assign({}, state, {
        isDropdownOpen: true,
      });
    case `compare_${actionTypes.CLOSE_DROPDOWN}`:
      return Object.assign({}, state, {
        isDropdownOpen: false,
      });
    case `compare_${actionTypes.TOGGLE_PREVIOUS_PERIOD}`:
      return Object.assign({}, state, {
        visualizePreviousPeriod: !state.visualizePreviousPeriod,
      });
    default:
      return state;
  }
};

export const actions = {
  togglePreviousPeriod() {
    return {
      type: `compare_${actionTypes.TOGGLE_PREVIOUS_PERIOD}`,
    };
  },
  openDropdown() {
    return {
      type: `compare_${actionTypes.OPEN_DROPDOWN}`,
    };
  },
  closeDropdown() {
    return {
      type: `compare_${actionTypes.CLOSE_DROPDOWN}`,
    };
  },
  selectMetric(metricLabel) {
    return {
      type: `compare_${actionTypes.SELECT_METRIC}`,
      metricLabel,
    };
  },
  selectDailyMode(mode) {
    return {
      type: `compare_${actionTypes.SELECT_DAILY_MODE}`,
      mode,
    };
  },
};
