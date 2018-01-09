import { actionTypes as fetchActions } from '@bufferapp/async-data-fetch';
import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('MULTI_PROFILE_SELECTOR', {
  TOGGLE_PROFILE: 'TOGGLE_PROFILE',
  COMPARE_PROFILES: 'COMPARE_PROFILES',
  FILTER_PROFILES: 'FILTER_PROFILES',
  OPEN_DROPDOWN: 'OPEN_DROPDOWN',
  CLOSE_DROPDOWN: 'CLOSE_DROPDOWN',
});

const initialState = {
  profiles: [],
  isDropdownOpen: false,
  profilesFilterString: '',
  selectedProfiles: [],
};

function updatedSelectedProfiles(profileId, selectedProfiles, profiles) {
  const selectedProfileIds = selectedProfiles.map(p => p.id);
  const index = selectedProfileIds.indexOf(profileId);
  const isNotAlreadySelected = index === -1;

  if (isNotAlreadySelected) {
    const selectedProfile = profiles.find(p => p.id === profileId);
    selectedProfiles.push(selectedProfile);
  } else {
    selectedProfiles = selectedProfiles.filter(p => p.id !== profileId);
  }
  return selectedProfiles;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `profiles_${fetchActions.FETCH_START}`:
      return initialState;
    case `profiles_${fetchActions.FETCH_SUCCESS}`:
      return Object.assign({}, state, {
        profiles: action.result,
      });
    case actionTypes.FILTER_PROFILES:
      return Object.assign({}, state, {
        profilesFilterString: action.filterString,
      });
    case actionTypes.TOGGLE_PROFILE:
      return Object.assign({}, state, {
        selectedProfiles: updatedSelectedProfiles(
          action.id,
          state.selectedProfiles,
          state.profiles,
        ),
      });
    case actionTypes.COMPARE_PROFILES:
      return Object.assign({}, state, {
        isDropdownOpen: false,
        profilesFilterString: '',
        selectedProfiles: state.selectedProfiles,
      });
    case `multiProfileSelector_${actionTypes.OPEN_DROPDOWN}`:
      return Object.assign({}, state, {
        isDropdownOpen: true,
      });
    case `multiProfileSelector_${actionTypes.CLOSE_DROPDOWN}`:
      return Object.assign({}, state, {
        isDropdownOpen: false,
      });
    default:
      return state;
  }
};

export const actions = {
  toggleProfile(id) {
    return {
      type: actionTypes.TOGGLE_PROFILE,
      id,
    };
  },
  compareProfiles(selectedProfiles) {
    return {
      type: actionTypes.COMPARE_PROFILES,
      selectedProfiles,
    };
  },
  openDropdown() {
    return {
      type: `multiProfileSelector_${actionTypes.OPEN_DROPDOWN}`,
    };
  },
  closeDropdown() {
    return {
      type: `multiProfileSelector_${actionTypes.CLOSE_DROPDOWN}`,
    };
  },
  filterProfilesByUsername({ target }) {
    return {
      type: actionTypes.FILTER_PROFILES,
      filterString: target ? target.value.toLowerCase() : '',
    };
  },
};

