import React from 'react';
import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux';
import Home from './components/Home';
import Onboard from './components/onboard';
import SideBar from './container/sidebar';
import Socket from './container/socket';
import Dashboard from './components/dashboard';
import Level from './components/Level';
import Support from './components/support';
import Team from './components/ourteam';
import Leaderboard from './components/Leaderboard/index';
import './App.css';
import actions from './actions';
import config from './config';
import NotFound from './components/notfound';
import TeamPage from './components/TeamPage';

const jwtDecode = require('jwt-decode');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.socket = socketIOClient(config.api.url);
    // sessionStorage.setItem({ online: 'yeep' });
    // window.addEventListener('beforeunload', (ev) => {
    //   props.logoutUser();
    // });
    // this.socket.on('openNextLevel', (alias) => {
    //   history.push(`/level/${alias}`);
    // });
  }


  // componentWillUnmount() {
  //   const { logoutUser } = this.props;
  //   logoutUser();
  // }

  render = () => (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Socket
          exact
          path="/onboard"
          component={Onboard}
          socket={this.socket}
          user={sessionStorage.getItem('jwtToken')
            ? jwtDecode(sessionStorage.getItem('jwtToken'))
            : null
          }
        />
        <SideBar
          exact
          path="/dashboard"
          component={Dashboard}
          user={
            sessionStorage.getItem('jwtToken')
              ? jwtDecode(sessionStorage.getItem('jwtToken'))
              : null
          }
          socket={this.socket}
        />

        <SideBar
          exact
          path="/level/:alias"
          component={Level}
          user={
            sessionStorage.getItem('jwtToken')
              ? jwtDecode(sessionStorage.getItem('jwtToken'))
              : null
          }
          socket={this.socket}
        />
        <SideBar
          exact
          path="/our-team"
          component={Team}
          user={
            sessionStorage.getItem('jwtToken')
              ? jwtDecode(sessionStorage.getItem('jwtToken'))
              : null
          }
          socket={this.socket}
        />
        <SideBar
          exact
          path="/team/:id"
          component={TeamPage}
          user={
            sessionStorage.getItem('jwtToken')
              ? jwtDecode(sessionStorage.getItem('jwtToken'))
              : null
          }
          socket={this.socket}
        />
        <SideBar
          exact
          path="/support"
          component={Support}
          user={
            sessionStorage.getItem('jwtToken')
              ? jwtDecode(sessionStorage.getItem('jwtToken'))
              : null
          }
          socket={this.socket}
        />
        <SideBar
          exact
          path="/leaderboard"
          component={Leaderboard}
          user={
            sessionStorage.getItem('jwtToken')
              ? jwtDecode(sessionStorage.getItem('jwtToken'))
              : null
          }
          socket={this.socket}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

const mapStateToProps = state => ({
  team: state.user.team,
});


const mapDispatchToProps = dispatch => ({
  getTeam: (team_id) => {
    dispatch(actions.getTeam(team_id));
  },
  getCurrentLevelAlias: () => {
    dispatch(actions.getAlias());
  },
  getLevelList: () => {
    dispatch(actions.getLevelList());
  },
  logoutUser: () => {
    dispatch(actions.logoutUser());
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
