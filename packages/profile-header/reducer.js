import { actionTypes as asyncDataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const actionTypes = {};

const initialState = {
  followersCount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `followers_${asyncDataFetchActionTypes.FETCH_START}`:
      return initialState;
    case `followers_${asyncDataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        followersCount: action.result.currentFollowerCount,
      };
    default:
      return state;
  }
};

export const actions = {};
