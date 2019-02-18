import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import actions from '../actions';

class LevelSidebar extends React.Component {
  componentDidMount() {
    const { getLevelList } = this.props;
    getLevelList();
  }

  render() {
    const { getLevel, levellist, history } = this.props;
    levellist.sort((a, b) => a.levelNo - b.levelNo);
    return (
      <ul id="slide-out1" className="sidenav">
        {
          levellist.map(l => (
            <li key={l.levelNo}>
              <a
                className="sidenav-close"
                href="#!"
                onClick={(e) => {
                  e.preventDefault(); history.push(`/level/${l.url_alias}`); getLevel(l.url_alias);
                }}
              >
                <i className="material-icons">
                  whatshot
                </i>
                Level
                {' '}
                {l.levelNo}
              </a>
              <hr />
            </li>
          ))
        }
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  alias: state.level.alias,
  levellist: state.level.levellist,
});


const mapDispatchToProps = dispatch => ({
  getLevelList: () => {
    dispatch(actions.getLevelList());
  },
  getLevel: (alias) => {
    dispatch(actions.getLevel(alias));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LevelSidebar));
