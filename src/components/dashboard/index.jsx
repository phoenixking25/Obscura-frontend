import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import loadjs from 'loadjs';
import actions from '../../actions';
import TeamDetails from '../shared/teamDetails';
import Team from './team';
import config from '../../config';

const jwtDecode = require('jwt-decode');

// conditional component view if the player is joined
const Decide = (props) => {
  const { teamExist, team, socket } = props;
  if (teamExist) {
    return <TeamDetails team={team} requests="" socket={socket} />;
  }
  return <Team />;
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamExist: false, // initialState that player has not joined any team.
      css: '',
    };
    loadjs('/js/init.js'); // calling materialize init functions.
    this.startTime = config.startTimestamp; // getting timestamp to start the event.

    this.user = sessionStorage.getItem('jwtToken') ? jwtDecode(sessionStorage.getItem('jwtToken')) : null;
  }

  componentDidMount = () => {
    const {
      getTeam, history, socket,
    } = this.props;
    if (this.user === null) {
      history.push('/');
    }

    if (!this.user.user.team_id) {
      this.setState({
        teamExist: false,
      });
    } else {
      getTeam(this.user.user.team_id);
      this.setState({
        teamExist: true,
      });
    }

    socket.on('requestRecieved', (id) => {
      console.log('recieved signal');
      getTeam(this.user.user.team_id);
    });
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.team) {
      this.setState({
        teamExist: true,
      });
    }
  }


  render() {
    const { teamExist } = this.state;
    const { team, socket } = this.props;
    return (
      <div>
        <div className="row center">
          <div className="col s12">
            <Decide teamExist={teamExist} team={team} socket={socket} />
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  team: state.user.team,
  alias: state.level.alias,
});


const mapDispatchToProps = dispatch => ({
  getTeam: (teamId) => {
    dispatch(actions.getTeam(teamId));
  },
  getCurrentLevelAlias: () => {
    dispatch(actions.getAlias());
  },
  getLevelList: () => {
    dispatch(actions.getLevelList());
  },
  getLevel: (alias) => {
    dispatch(actions.getLevel(alias));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
