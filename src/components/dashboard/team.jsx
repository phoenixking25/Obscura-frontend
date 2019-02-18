import React from 'react';
import { connect } from 'react-redux';
import {
  withRouter,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import actions from '../../actions';
import Avatar from '../shared/avatar';
import SweetAlert from '../shared/sweetAlert';

class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      picture: '',
      secretKey: '',
      index: 1, // for paginator
      teams: [], // all teams
      sliced: [], // current displying teams
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { getTeamList } = this.props;
    getTeamList();
  }

  componentWillReceiveProps = (nextProps) => {
    nextProps.teams.sort((a, b) => (b.level_no - a.level_no)); // Sorting accroding to level no.

    // adding additional property to mark the sent teams objects.
    nextProps.teams.map((t) => {
      nextProps.userRequests.map((i) => {
        if (i === t._id) {
          t.sent = true;
        }
      });
    });
    this.setState({
      teams: nextProps.teams,
      sliced: nextProps.teams.slice(0, 10), // By default top 10
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { picture, name, secretKey } = this.state;
    if (picture === '') {
      SweetAlert('Please Select An Avatar', 'error');
    } else {
      const { createTeam } = this.props;
      SweetAlert(`Creating your Team! ${name}`, 'success');
      createTeam({
        name, picture, secretKey,
      });
    }
  }

  changeAvatar = (avatar) => {
    this.setState({ picture: avatar });
  }

  sendRequest(id, teamName) {
    const { sendTeamRequest } = this.props;
    SweetAlert(`Sending team joining request to TEAM ${teamName}`, 'success');
    sendTeamRequest(id);
  }

  // Paginator function
  goToPage(i) {
    const { teams } = this.state;
    this.setState({
      index: i,
      sliced: teams.slice((i - 1) * 10, i * 10),
    });
  }

  render() {
    // Making array of avatar addresses
    const avatarName = [];
    for (let i = 2; i <= 60; i += 1) {
      avatarName.push(`/images/avatars/${i}.png`);
    }
    const {
      name, picture, secretKey, sliced, index, teams,
    } = this.state;

    // Making array for paginator on which we loop.
    const pager = [];
    for (let i = 1, j = 1; i <= teams.length; i += 10, j += 1) {
      pager.push(
        <li
          key={i}
          className={index === j ? 'active' : 'waves-effect'}
          onClick={(e) => {
            e.preventDefault(); this.goToPage(j);
          }}
        >
          <a href="#!">
            {j}
          </a>
        </li>,
      );
    }
    return (
      <div className="row fade">
        <div className="col s12 black-text">

          <div className="row">
            <div className="col s12">
              <a href="#modal1" className="btn-floating btn-large waves-effect waves-light red modal-trigger create-team-button">
                <i className="material-icons">
                  add
                </i>
              </a>
              <h6>
                Make your own Team.
              </h6>
            </div>
          </div>

          <div className="card z-index-4">

            <ul className="collapsible">
              <li>
                <div className="collapsible-header grey darken-3 white-text">
                  <i className="material-icons ">
                    group
                  </i>
                  Join a Team
                </div>
              </li>
            </ul>
            <table className="highlight centered responsive-table">
              <thead>
                <tr>
                  <th>
                    Avatar
                  </th>
                  <th>
                    Team Name
                  </th>
                  <th>
                    Team Members
                  </th>
                  <th>
                    Current Level
                  </th>
                  <th>
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {sliced.map(t => (
                  <tr key={t._id}>
                    <td>
                      <img className="responsive-img" src={t.picture} alt="avatar" width="45" />
                    </td>
                    <td>
                      {t.name}
                    </td>
                    <td>
                      {t.players.length}
                    </td>
                    <td>
                      {t.level_no}
                    </td>
                    <td>
                      <button
                        type="submit"
                        onClick={(event) => { event.preventDefault(); this.sendRequest(t._id, t.name); }}
                        className={t.sent ? 'waves-effect waves-light btn disabled' : 'waves-effect waves-light btn'}
                      >
                        {t.sent ? 'Sent' : 'Send Request'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATOR */}
          <ul className="pagination">
            <li className={index > 1 ? 'waves-effect' : 'disabled'}>
              <a href="#!">
                <i className="material-icons">
                  chevron_left
                </i>
              </a>
            </li>
            {
              pager.map(i => (
                i
              ))
            }
            <li className={index < pager.length ? 'waves-effect' : 'disabled'}>
              <a href="#!">
                <i className="material-icons">
                  chevron_right
                </i>
              </a>
            </li>
          </ul>

          <div className="row center">
            <div className="col s12">

              <div id="modal1" className="modal">
                <div className="modal-content">
                  <h4>
                    Create Your Own Team
                  </h4>
                  <div className="input-field col s12">
                    <div className="row">
                      {picture === '' ? (
                        <p>
                          No image provided
                        </p>
                      ) : (
                        <img src={picture} className="circle responsive-img" alt="img" width="100" />
                      )}
                    </div>
                    <a className="waves-effect waves-light btn modal-trigger" href="#modal2">
                      <i className="material-icons left">
                        cloud
                      </i>
                      Choose your Avatar
                    </a>
                    <div id="modal2" className="modal">
                      <div className="modal-content">
                        <h4>
                          Select your Team avatar
                          {/* <i href="#modal1" className="material-icons right modal-close">
                            cancel
                          </i> */}
                        </h4>
                        <Avatar onSelectAvatar={this.changeAvatar} />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <form className="col s12" onSubmit={this.handleSubmit}>
                      <div className="row">
                        <div className="input-field col s12">
                          <input id="name" type="text" name="name" value={name} className="validate" onChange={this.onChange} required />
                          <label htmlFor="name">
                            Team name
                          </label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="input-field col s12">
                          <input id="secret" type="text" name="secretKey" value={secretKey} className="validate" onChange={this.onChange} required />
                          <label htmlFor="secret">
                            Team Secret Key
                          </label>
                        </div>
                      </div>
                      <button className="modal-close btn waves-effect waves-light" type="submit">
                        Submit
                        <i className="material-icons right">
                          send
                        </i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

Team.defaultProps = {
  getTeamList: () => null,
  sendTeamRequest: () => null,
  createTeam: () => null,
  teams: [],
};

Team.propTypes = {
  getTeamList: () => null,
  sendTeamRequest: () => null,
  createTeam: () => null,
  teams: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => ({
  teams: state.teams,
  userRequests: state.user.sentRequests,
});


const mapDispatchToProps = dispatch => ({
  getTeamList: () => {
    dispatch(actions.getTeamList());
  },
  sendTeamRequest: (id) => {
    dispatch(actions.sendTeamRequest(id));
  },
  createTeam: (formData) => {
    dispatch(actions.createTeam(formData));
  },
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Team));
