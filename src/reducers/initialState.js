const initialState = {
  loading: false,
  leaderboard: {
    count: 0,
    list: [],
  },
  teams: [],
  user: {
    loggedin: false,
    signupRequired: false,
    registered: false,
    userData: {},
    onboard: false,
    sentRequests: [],
  },
  level: {
    levellist: [],
    nextLevelAlias: '', // level alias that comes in response
    alias: '', // top level alias that is open to user
  },
  url: '/',
  messageSent: false,
  otherTeam: {},
  clearLevel: false,
  locator: 'Dashboard',
};

export default initialState;
