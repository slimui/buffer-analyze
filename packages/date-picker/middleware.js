import { actions, actionTypes } from '@bufferapp/async-data-fetch';
import { actionTypes as profileActionTypes } from '@bufferapp/analyze-profile-selector';
import { actions as dateActions } from './reducer';

const getStartDate = (query) => {
  let startDate = query.match(/start_date=(.*)&/);
  if (startDate) {
    startDate = parseInt(startDate[1], 10);
  }
  return startDate;
};
const getEndDate = (query) => {
  let endDate = query.match(/end_date=(.*)$/);
  if (endDate) {
    endDate = parseInt(endDate[1], 10);
  }
  return endDate;
};

export default ({ dispatch, getState }) => next => (action) => {
  let startDate;
  let endDate;
  const state = getState();
  const result = action.result;
  switch (action.type) {
    case `get_report_${actionTypes.FETCH_SUCCESS}`:
      if (result.date_range.range) {
        dispatch(dateActions.setDatePreset(result.date_range));
      } else {
        dispatch(dateActions.setDateRange(result.date_range.startDate, result.date_range.endDate));
      }
      break;
    case `user_${actionTypes.FETCH_SUCCESS}`:
      startDate = getStartDate(state.router.location.search);
      endDate = getEndDate(state.router.location.search);
      if (startDate && endDate) {
        dispatch(dateActions.setDateRange(startDate, endDate));
      }
      break;
    case profileActionTypes.SELECT_PROFILE:
      dispatch(actions.fetch({
        name: 'analytics_start_date',
        args: {
          profileId: action.profile.id,
        },
      }));
      break;
    default:
      break;
  }
  return next(action);
};
