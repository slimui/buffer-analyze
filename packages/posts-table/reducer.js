import { actionTypes as asyncDataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actionTypes as profileActionTypes } from '@bufferapp/analyze-profile-selector';

import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('POSTS_TABLE', {
  SELECT_TOP_POSTS_METRIC: 'SELECT_TOP_POSTS_METRIC',
  TOGGLE_TOP_POSTS_DROPDOWN: 'TOGGLE_TOP_POSTS_DROPDOWN',
  SELECT_TOP_POSTS_COUNT: 'SELECT_TOP_POSTS_COUNT',
});

const initialState = {
  posts: [],
  loading: true,
  metrics: [],
  isDropdownOpen: false,
  isDescendingSelected: true,
  selectedMetric: {},
  activePostsCount: 10,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `posts_${asyncDataFetchActionTypes.FETCH_START}`:
      return {
        ...initialState,
        activePostsCount: state.activePostsCount,
        selectedMetric: state.selectedMetric,
        isDescendingSelected: state.isDescendingSelected,
      };
    case `posts_${asyncDataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        loading: false,
        posts: action.result,
      };
    case actionTypes.SELECT_TOP_POSTS_METRIC:
      return {
        ...state,
        isDropdownOpen: false,
        selectedMetric: action.metric,
      };
    case actionTypes.SELECT_TOP_POSTS_COUNT:
      return {
        ...state,
        activePostsCount: action.postsCount,
      };
    case actionTypes.TOGGLE_TOP_POSTS_DROPDOWN:
      return {
        ...state,
        isDropdownOpen: !state.isDropdownOpen,
      };
    case profileActionTypes.SELECT_PROFILE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export const actions = {
  selectMetric(metric) {
    return {
      type: actionTypes.SELECT_TOP_POSTS_METRIC,
      metric,
    };
  },
  toggleDropdown() {
    return {
      type: actionTypes.TOGGLE_TOP_POSTS_DROPDOWN,
    };
  },
  handlePostsCountClick(postsCount) {
    return {
      type: actionTypes.SELECT_TOP_POSTS_COUNT,
      postsCount,
    };
  },
};
