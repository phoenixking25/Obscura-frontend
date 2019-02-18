import fetch from 'node-fetch';
import config from '../config';
import SweetAlert from '../components/shared/sweetAlert';

const jwtDecode = require('jwt-decode');

// const cryptoJSON = require('crypto-json');


// const decrypt = data => cryptoJSON.decrypt(data, config.cypher.passKey, {
//   algorithm: config.cypher.algo,
//   encoding: config.cypher.encoding,
//   keys: [],
// });

const errorHandle = (res) => {
  switch (res.status) {
    case 500:
      SweetAlert('Internal server error!', 'error');
      break;

    case 401:
    case 403:
      if (sessionStorage.getItem('jwtToken') != null) {
        sessionStorage.removeItem('jwtToken');
      }
      break;

    default:
      break;
  }
};


const login = (token, provider) => {
  const reqOptions = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    credentials: 'include',
    body: JSON.stringify({
      token,
      provider,
    }),
  };
  return fetch(`${config.api.url}/auth/login`, reqOptions)
    .then((response) => {
      errorHandle(response);
      return response.json();
    })
    .then((user) => {
      if (user && user.token) {
        sessionStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    }).catch(err => err);
};

const logoutUser = () => {
  const reqOptions = {
    method: 'GET',
    headers: new Headers({
      Authorization: sessionStorage.getItem('jwtToken'),
    }),
    credentials: 'include',
  };
  return fetch(`${config.api.url}/auth/logout`, reqOptions)
    .then((response) => {
      errorHandle(response);
      return response.json();
    })
    .then(response => response)
    .catch(err => err);
};

const onBoardUser = (formData) => {
  const reqOptions = {
    method: 'PUT',
    headers: new Headers({
      Authorization: sessionStorage.getItem('jwtToken'),
      'Content-Type': 'application/json',
    }),
    credentials: 'include',
    body: JSON.stringify(formData),
  };
  return fetch(`${config.api.url}/players/${jwtDecode(sessionStorage.getItem('jwtToken')).user._id}`, reqOptions)
    .then((response) => {
      errorHandle(response);
      return response.json();
    })
    .then(response => response);
};

const fetchLeaderboard = (skip, limit) => {
  const reqOptions = {
    method: 'GET',
    headers: new Headers({
      Authorization: sessionStorage.getItem('jwtToken'),
    }),
    credentials: 'include',
  };
  return fetch(`${config.api.url}/teams?skip=${skip}&limit=${limit}&sort=true`, reqOptions)
    .then((response) => {
      errorHandle(response);
      return response.json();
    })
    .then(response => response);
};

const getLevelList = () => {
  const reqOptions = {
    method: 'GET',
    headers: new Headers({
      Authorization: sessionStorage.getItem('jwtToken'),
    }),
    credentials: 'include',
  };
  return fetch(`${config.api.url}/levels?action=getAllLevels`, reqOptions)
    .then((response) => {
      errorHandle(response);
      return response.json();
    })
    .then(response => response);
};

const fetchLevel = (alias) => {
  const reqOptions = {
    method: 'GET',
    headers: new Headers({
      Authorization: sessionStorage.getItem('jwtToken'),
    }),
    credentials: 'include',
  };
  return fetch(`${config.api.url}/levels?action=getAliasLevel&alias=${alias}`, reqOptions).then((response) => {
    errorHandle(response);
    return response.json();
  });
};

const getAlias = () => {
  const reqOptions = {
    method: 'GET',
    headers: new Headers({
      Authorization: sessionStorage.getItem('jwtToken'),
    }),
    credentials: 'include',
  };
  return fetch(`${config.api.url}/levels?action=getLevelAlias`, reqOptions)
    .then((response) => {
      errorHandle(response);
      return response.json();
    })
    .then(response => response);
};

const postAns = (ans, alias) => {
  const reqOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: sessionStorage.getItem('jwtToken'),
      'Content-Type': 'application/json',
    }),
    credentials: 'include',
    body: JSON.stringify(ans),
  };
  return fetch(`${config.api.url}/levels/${alias}`, reqOptions)
    .then((response) => {
      errorHandle(response);
      return response.json();
    })
    .then(response => response);
};

const getTeamList = () => {
  const reqOptions = {
    method: 'GET',
    headers: new Headers({
      Authorization: sessionStorage.getItem('jwtToken'),
    }),
    credentials: 'include',
  };
  return fetch(`${config.api.url}/teams`, reqOptions)
    .then((response) => {
      errorHandle(response);
      return response.json();
    })
    .then(response => response);
};

const getTeam = (teamId) => {
  const reqOptions = {
    method: 'GET',
    headers: new Headers({
      Authorization: sessionStorage.getItem('jwtToken'),
    }),
    credentials: 'include',
  };
  return fetch(`${config.api.url}/teams/${teamId}`, reqOptions)
    .then((response) => {
      errorHandle(response);
      return response.json();
    })
    .then(response => response);
};

const sendTeamRequest = (teamId) => {
  const reqOptions = {
    method: 'PUT',
    headers: new Headers({
      Authorization: sessionStorage.getItem('jwtToken'),
      'Content-Type': 'application/json',
    }),
    credentials: 'include',
  };
  return fetch(`${config.api.url}/teams/${teamId}?action=request`, reqOptions)
    .then((response) => {
      errorHandle(response);
      return response.json();
    })
    .then(response => response);
};

const createTeam = (formData) => {
  const reqOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: sessionStorage.getItem('jwtToken'),
      'Content-Type': 'application/json',
    }),
    credentials: 'include',
    body: JSON.stringify(formData),
  };
  return fetch(`${config.api.url}/teams`, reqOptions)
    .then((response) => {
      errorHandle(response);
      return response.json();
    })
    .then(response => response);
};

const sendMessage = (formData) => {
  const reqOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  reqOptions.body = JSON.stringify(formData);
  reqOptions.headers.Authorization = sessionStorage.getItem('jwtToken');
  reqOptions.method = 'POST';
  return fetch(`${config.api.url}/messages?action=email&to=admin`, reqOptions)
    .then((response) => {
      errorHandle(response);
      return response.json();
    })
    .then(response => response);
};

const acceptRequest = (reqId) => {
  const reqOptions = {
    method: 'PUT',
    headers: new Headers({
      Authorization: sessionStorage.getItem('jwtToken'),
      'Content-Type': 'application/json',
    }),
    credentials: 'include',
    body: JSON.stringify({
      reqId,
    }),
  };
  return fetch(`${config.api.url}/teams/${jwtDecode(sessionStorage.getItem('jwtToken')).user.team_id}?action=accept_request`, reqOptions)
    .then((response) => {
      errorHandle(response);
      return response.json();
    })
    .then(response => response);
};

const deleteRequest = (reqId) => {
  const reqOptions = {
    method: 'PUT',
    headers: new Headers({
      Authorization: sessionStorage.getItem('jwtToken'),
      'Content-Type': 'application/json',
    }),
    credentials: 'include',
    body: JSON.stringify({
      reqId,
    }),
  };
  return fetch(`${config.api.url}/teams/${jwtDecode(sessionStorage.getItem('jwtToken')).user.team_id}?action=delete`, reqOptions)
    .then((response) => {
      errorHandle(response);
      return response.json();
    })
    .then(response => response);
};

export default {
  login,
  onBoardUser,
  fetchLeaderboard,
  getAlias,
  fetchLevel,
  postAns,
  getLevelList,
  getTeamList,
  sendTeamRequest,
  createTeam,
  sendMessage,
  getTeam,
  acceptRequest,
  deleteRequest,
  logoutUser,
};
