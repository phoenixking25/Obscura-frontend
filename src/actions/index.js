import { showSnack } from 'react-redux-snackbar';
import services from '../services';
import SweetAlert from '../components/shared/sweetAlert';

const jwtDecode = require('jwt-decode');

const success = (type, data) => ({
  type,
  data,
});

const failure = (type, data) => ({
  type,
  data,
});

const startLoader = () => (dispatch) => {
  dispatch(success('START_LOADER', null));
};

const stopLoader = () => (dispatch) => {
  dispatch(success('STOP_LOADER', null));
};

const clearJs = () => (dispatch) => {
  dispatch(success('CLEAR_JS', null));
};

const clearUser = () => (dispatch) => {
  dispatch(success('CLEAR_USER', null));
};

const login = (token, provider) => (dispatch) => {
  services.login(token, provider).then(
    (data) => {
      if (!data.success && data.singleDevice) {
        SweetAlert('Some error occured while login you. Try Again', 'error');
        dispatch(failure('SIGNUP_REQUIRED', data));
      } else if (!data.success && !data.singleDevice) {
        SweetAlert('Someone is already active with this account', 'error');
        dispatch(clearUser());
      } else {
        dispatch(success('SUCCESS_LOGIN', data));
      }
    },
    (err) => {
      console.log(err);
    },
  );
};


const getLevelList = () => (dispatch) => {
  dispatch(startLoader());
  services.getLevelList().then(
    (list) => {
      dispatch(stopLoader());
      if (!list.success) {
        dispatch(failure('FAILURE_LIST', list));
      } else {
        dispatch(success('SUCCESS_LIST', list));
      }
    },
  );
};

const getTeam = teamId => (dispatch) => {
  dispatch(startLoader());
  services.getTeam(teamId).then(
    (response) => {
      dispatch(stopLoader());
      if (response.success && response.data._id === jwtDecode(sessionStorage.getItem('jwtToken')).user.team_id) {
        dispatch(success('TEAM_FETCH_SUCCESS', response));
      } else if (response.success) {
        dispatch(success('OTHER_TEAM_FETCH', response));
      } else {
        dispatch(failure('TEAM_FETCH_FAILURE', response));
      }
    },
  );
};

const onboard = formData => (dispatch) => {
  services.onBoardUser(formData).then(
    (response) => {
      if (response.success) {
        dispatch(success('SIGNUP_SUCCESS', response));
      } else {
        dispatch(failure('SIGNUP_ERROR', null));
      }
    },
  );
};

const getLeaderboard = (skip, limit) => (dispatch) => {
  dispatch(startLoader());
  services.fetchLeaderboard(skip, limit).then(
    (response) => {
      dispatch(stopLoader());
      if (response.success) {
        dispatch(success('LEADERBOARD_SUCCESS', response));
      } else {
        dispatch(failure('LEADERBOARD_FAILURE', response));
      }
    },
    (err) => {
      console.log(err);
    },
  );
};

const acceptRequest = requesterId => (dispatch) => {
  dispatch(startLoader());
  services.acceptRequest(requesterId).then(
    (response) => {
      dispatch(stopLoader());
      if (response.success) {
        dispatch(success('ACCEPT_SUCCESS', response));
        dispatch(getTeam(jwtDecode(sessionStorage.getItem('jwtToken')).user.team_id));
      } else {
        dispatch(failure('ACCEPT_FAILURE', response));
      }
    },
  );
};

const deleteRequest = requesterId => (dispatch) => {
  dispatch(startLoader());
  services.deleteRequest(requesterId).then(
    (response) => {
      dispatch(stopLoader());
      if (response.success) {
        dispatch(success('DELETE_SUCCESS', response));
        dispatch(getTeam(jwtDecode(sessionStorage.getItem('jwtToken')).user.team_id));
      } else {
        dispatch(failure('DELETE_FAILURE', response));
      }
    },
  );
};

const clearLevel = () => (dispatch) => {
  dispatch(success('CLEAR_LEVEL', null));
};

const setLevel = () => (dispatch) => {
  dispatch(success('SET_LEVEL', null));
};

const getLevel = alias => (dispatch) => {
  dispatch(startLoader());
  dispatch(clearLevel());
  dispatch(clearJs());
  services.fetchLevel(alias).then(
    (response) => {
      dispatch(stopLoader());
      if (response.success) {
        dispatch(setLevel());
        dispatch(success('LEVEL_SUCCESS', response));
      } else {
        dispatch(failure('LEVEL_FAILURE', response.status));
        dispatch(showSnack('myUniqueId', {
          label: response.message,
          timeout: 2000,
          button: { label: 'OK, GOT IT' },
        }));
        // setTimeout(() => { history.goBack(); }, 2000);
      }
    },
  );
};

const getAlias = () => (dispatch) => {
  dispatch(startLoader());
  services.getAlias().then(
    (response) => {
      dispatch(stopLoader());
      if (response.success) {
        dispatch(success('ALIAS_SUCCESS', response));
      } else {
        // SweetAlert('Level Not Found', 'error');
        dispatch(failure('LEVEL_NOT_CREATED', response));
      }
    },
  );
};


const postAns = (ans, alias) => (dispatch) => {
  dispatch(startLoader());
  const errorMsg = status => ({
    type: 'ERROR',
    status,
  });
  services.postAns(ans, alias).then(
    (response) => {
      dispatch(stopLoader());
      if (response.success && response.ansCorrect) {
        dispatch(getAlias());
        dispatch(success('RIGHT_ANS', response));
      } else if (response.success && !response.ansCorrect) {
        dispatch(failure('WRONG_ANS', response));
        SweetAlert('Wrong Answer', 'error');
        dispatch(showSnack('myUniqueId', {
          label: response.message,
          timeout: 2000,
          button: { label: 'OK, GOT IT' },
        }));
      } else {
        dispatch(errorMsg(response.status));
      }
    },
  );
};

const getTeamList = () => (dispatch) => {
  dispatch(startLoader());
  services.getTeamList().then(
    (response) => {
      dispatch(stopLoader());
      if (response.success) {
        const a = [];
        response.data.teams.map((t) => {
          t.requests.map((ri) => {
            if (ri.requester_id === jwtDecode(sessionStorage.getItem('jwtToken')).user._id) {
              a.push(t._id);
            }
          });
        });
        dispatch(success('TEAM_LIST_FETCHED', response.data));
        dispatch(success('SUCCESSFULLY_SENT_REQUEST', a));
      } else {
        dispatch(success('TEAM_LIST_FAILURE', response.data));
      }
    },
  );
};

const sendTeamRequest = teamId => (dispatch) => {
  dispatch(startLoader());
  services.sendTeamRequest(teamId).then(
    (response) => {
      dispatch(stopLoader());
      if (response.success) {
        dispatch(success('SUCCESSFULLY_SENT_REQUEST', [teamId]));
      } else {
        dispatch(failure('ERROR_SENDING_REQUEST', null));
      }
    },
  );
};

const createTeam = formData => (dispatch) => {
  dispatch(startLoader());
  services.createTeam(formData).then(
    (response) => {
      dispatch(stopLoader());
      if (response.success) {
        dispatch(getAlias());
        dispatch(success('TEAM_CREATE_SUCCESS', response));
      } else {
        dispatch(failure('ERROR_TEAM_CREATE', null));
      }
    },
  );
};

const sendMessage = data => (dispatch) => {
  services.sendMessage(data).then(
    (response) => {
      if (response.success) {
        dispatch(success('SUCCESSFULLY_SENT_MESSAGE', data));
      } else {
        dispatch(failure('ERROR_SENDING_MESSAGE', null));
      }
    },
  );
};


const logoutUser = () => (dispatch) => {
  services.logoutUser().then(
    (res) => {
      if (res.success) {
        dispatch(success('CLEAR_USER_', null));
      } else {
        dispatch(success('CLEAR_USER_', null));
      }
    },
  );
};


export default {
  login,
  getLevelList,
  onboard,
  getLeaderboard,
  getLevel,
  getAlias,
  postAns,
  getTeamList,
  sendTeamRequest,
  createTeam,
  sendMessage,
  getTeam,
  acceptRequest,
  deleteRequest,
  clearUser,
  clearLevel,
  logoutUser,
};
