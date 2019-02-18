import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from '../../actions';
import SweetAlert from '../shared/sweetAlert';

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
    };
  }

  componentDidMount = () => {
    const { getLeaderboard } = this.props;
    getLeaderboard(0, 10);
  }

  // nextPage = () => {
  //   const { getLeaderboard } = this.props;
  //   const { index } = this.state;
  //   getLeaderboard((index), 10);
  //   this.setState({
  //     index: index + 1,
  //   });
  // }

  // prevPage = () => {
  //   const { getLeaderboard } = this.props;
  //   const { index } = this.state;
  //   getLeaderboard((index - 2), 10);
  //   this.setState({
  //     index: index - 1,
  //   });
  // }

  goToTeamPage = (id) => {
    const { history } = this.props;
    history.push(`/team/${id}`);
  }

  goToPage = (index) => {
    SweetAlert('Fetching Leaderboard Please Wait!', 'success');
    const { getLeaderboard } = this.props;
    getLeaderboard((index - 1), 10);
    this.setState({
      index,
    });
  }

  render() {
    const pager = [];
    const { list, count } = this.props;
    const { index } = this.state;
    for (let i = 1, j = 1; i <= count; i += 10, j += 1) {
      pager.push(
        <li
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
      <div className="row center">
        <div className="col s12">
          <h4>
            Leaderboard
          </h4>
          {/* <LineChart data={list} /> */}
          <div className="row">
            <div className="col s12">


              <table className="highlight centered responsive-table">
                <thead>
                  <tr>
                    <th>
                      Rank
                    </th>
                    <th>
                      Avatar
                    </th>
                    <th>
                      Team Name
                    </th>
                    <th>
                      Level
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {
                    list.map((l, i) => (
                      <tr
                        className="select-pointer fade"
                        onClick={(e) => {
                          e.preventDefault(); this.goToTeamPage(l._id);
                        }}
                      >
                        <td>
                          {10 * (index - 1) + i + 1}
                        </td>
                        <td>
                          <img className="responsive-img" src={l.picture} alt="avatar" width="45" />
                        </td>
                        <td>
                          {l.name}
                        </td>
                        <td>
                          {l.level_no}
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>

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


            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  count: state.leaderboard.count,
  list: state.leaderboard.list,
});


const mapDispatchToProps = dispatch => ({
  getLeaderboard: (skip, limit) => {
    dispatch(actions.getLeaderboard(skip * 10, limit));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Leaderboard));
