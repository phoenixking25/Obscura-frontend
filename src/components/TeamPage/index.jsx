import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TeamDetails from '../shared/teamDetails';
import actions from '../../actions';

class TeamPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team: {
        players: [],
        requests: [],
      },
    };
  }

  componentDidMount = () => {
    const { id } = this.props.match.params;
    const { getTeam } = this.props;
    getTeam(id);
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      team: nextProps.otherteam,
    });
  }

  render =() => {
    const { team } = this.state;
    return (
      <TeamDetails team={team} hidden />
    );
  }
}

const mapStateToProps = state => ({
  otherteam: state.otherTeam,
});


const mapDispatchToProps = dispatch => ({
  getTeam: (teamId) => {
    dispatch(actions.getTeam(teamId));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeamPage));
