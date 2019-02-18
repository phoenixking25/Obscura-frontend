import {
  combineReducers,
} from 'redux';
import {
  snackbarReducer,
} from 'react-redux-snackbar';
import initialState from './initialState';
import history from '../utils/history';
import SweetAlert from '../components/shared/sweetAlert';

const jwtDecode = require('jwt-decode');

const url = (state = initialState, action) => {
  switch (action.type) {
    case 'URL':
      return action.url;
    default:
      return history.location.pathname;
  }
};

const message = (state = initialState.messageSent, action) => {
  switch (action.type) {
    case 'SUCCESSFULLY_SENT_MESSAGE':
      SweetAlert('Your support is on the way! :)', 'success');
      return true;
    case 'ERROR_SENDING_MESSAGE':
      SweetAlert('Try Again in some time', 'error');
      return false;
    default:
      return state;
  }
};

const otherTeam = (state = initialState.otherTeam, action) => {
  switch (action.type) {
    case 'OTHER_TEAM_FETCH':
      return action.data.data;
    default:
      return state;
  }
};

const user = (state = initialState.user, action) => {
  switch (action.type) {
    case 'CLEAR_USER':
      return {
        loggedin: false,
        signupRequired: false,
        registered: false,
        userData: {},
        onboard: false,
        sentRequests: [],
      };
    case 'SUCCESS_LOGIN':
      sessionStorage.setItem('jwtToken', action.data.data.token);
      return Object.assign({}, state, {
        userData: jwtDecode(action.data.data.token).user,
        loggedin: true,
        onboard: !!(jwtDecode(action.data.data.token).user.onboard),
      });

    case 'SIGNUP_REQUIRED':
      return Object.assign({}, state, {
        userData: {},
        loggedin: false,
        onboard: false,
      });

    case 'SIGNUP_SUCCESS':
      sessionStorage.setItem('jwtToken', action.data.data.token);
      return Object.assign({}, state, {
        loggedin: true,
        jwtToken: action.data.data.token,
        registered: true,
        onboard: true,
      });

    case 'SIGNUP_ERROR':
      return Object.assign({}, state, {
        registered: false,
        signupRequired: false,
      });

    case 'SUCCESSFULLY_SENT_REQUEST':
      return Object.assign({}, state, {
        sentRequests: state.sentRequests.concat(action.data),
      });
    case 'TEAM_CREATE_SUCCESS':
      sessionStorage.setItem('jwtToken', action.data.data.token);
      return Object.assign({}, state, {
        team: action.data.data.team,
      });
    case 'TEAM_FETCH_SUCCESS':
      return Object.assign({}, state, {
        team: action.data.data,
      });
    default:
      return state;
  }
};

const teams = (state = initialState.teams, action) => {
  switch (action.type) {
    case 'TEAM_LIST_FETCHED':
      return action.data.teams;
    default:
      return state;
  }
};

const leaderboard = (state = initialState.leaderboard, action) => {
  switch (action.type) {
    case 'LEADERBOARD_SUCCESS':
      return {
        count: action.data.data.count,
        list: action.data.data.teams,
      };
    case 'LEADERBOARD_FAILURE':
      return Object.assign({}, state, {
        error: action.status,
      });
    default:
      return state;
  }
};

const level = (state = initialState.level, action) => {
  switch (action.type) {
    case 'SUCCESS_LIST':
      return Object.assign({}, state, {
        levellist: action.data.data,
      });

    case 'FAILURE_LIST':
      return Object.assign({}, state, {
        levellist: [],
      });
    case 'ALIAS_SUCCESS':
      return Object.assign({}, state, {
        alias: action.data.data.alias,
      });

    case 'LEVEL_NOT_CREATED':
      return Object.assign({}, state, {
        error: action.status,
      });

    case 'LEVEL_SUCCESS':
      return Object.assign({}, state, action.data.data);

    case 'LEVEL_FAILURE':
      return Object.assign({}, state, {
        error: action.status,
      });

    case 'RIGHT_ANS':
      return Object.assign({}, state, {
        ansCheck: true,
        nextLevelAlias: action.data.data.alias,
      });

    case 'CLEAR_JS':
      return Object.assign({}, state, {
        js: '',
      });

    case 'WRONG_ANS':
      return Object.assign({}, state, {
        error: action.status,
        ansCheck: false,
      });

    case 'ERROR':
      return Object.assign({}, state, {
        error: action.status,
        ansCheck: false,
      });

    default:
      return state;
  }
};

const clearLevel = (state = initialState.clearLevel, action) => {
  switch (action.type) {
    case 'CLEAR_LEVEL':
      return true;
    case 'SET_LEVEL':
      return false;
    default:
      return state;
  }
};

const loading = (state = initialState.loading, action) => {
  switch (action.type) {
    case 'START_LOADER':
      return true;

    case 'STOP_LOADER':
      return false;

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user,
  leaderboard,
  level,
  url,
  teams,
  snackbar: snackbarReducer,
  message,
  otherTeam,
  clearLevel,
  loading,
});

export default rootReducer;
