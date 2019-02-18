import React from 'react';
import {
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LevelView from './levelView';
import Twitter from './twitter';
import actions from '../../actions';
import SweetAlert from '../shared/sweetAlert';
import Loader from '../shared/loader';

class Level extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      picture: '',
      alias: '',
      html: '',
      firstTimejs: true,
    };
  }

  componentDidMount = () => {
    const { getLevel } = this.props;
    const alias = this.props.match.params.alias;
    getLevel(alias);
  }

  componentWillReceiveProps = (nextProps) => {
    const { nextLevelAlias } = this.props;

    const { firstTimejs } = this.state;

    if (nextProps.level.name) {
      this.setState({
        name: nextProps.level.name,
        picture: nextProps.level.picture,
        html: nextProps.level.html,
      }, () => {
        const { name } = this.state;
        if (firstTimejs && name && nextProps.level.js !== '') {
          // eslint-disable-next-line
          eval(nextProps.level.js);
          this.setState({
            firstTimejs: false,
          });
        }
      });
    }

    if (nextProps.nextLevelAlias !== nextLevelAlias && nextProps.nextLevelAlias !== '' && nextProps.ansCheck) {
      SweetAlert('Congratulations', 'success');
      const { history } = this.props;
      history.push(`/level/${nextProps.nextLevelAlias}`);
      const { getLevel, getLevelList } = this.props;
      getLevel(nextProps.nextLevelAlias);
      getLevelList();
      this.setState({
        name: '',
        picture: '',
        alias: '',
        html: '',
        firstTimejs: true,
      });
    }

    if (nextProps.clearLevel) {
      this.setState({
        name: '',
        picture: '',
        alias: '',
        html: '',
        firstTimejs: true,
      });
    }
  }

  render() {
    const {
      name, picture, html, alias,
    } = this.state;
    return (
      <div className="row">
        <div className="col s12">
          <div className="row">
            <div className="col s12 m12 l8 center">

              {name ? (
                <LevelView
                  name={name}
                  picture={picture}
                  alias={alias}
                  html={html}
                />
              ) : (
                <Loader />
              )}

            </div>
            <div className="col l4">
              <div className="row hide-on-med-and-down">
                <div className="col s12">
                  <Twitter />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Level.propTypes = {
  // match: PropTypes.string,
  getLevel: () => null,
  alias: PropTypes.string,
  name: PropTypes.string,
  html: PropTypes.string,
  ansCheck: PropTypes.bool,
  nextLevelAlias: PropTypes.string,
  picture: PropTypes.arrayOf(PropTypes.string),
  level: PropTypes.objectOf(PropTypes.string),
  history: () => null,
};


Level.defaultProps = {
  ansCheck: false,
  name: '',
  html: '',
  picture: [],
  getLevel: () => null,
  alias: '',
  nextLevelAlias: '',
  level: {},
  history: () => null,
  // match: '',
};

const mapStateToProps = state => ({
  level: state.level,
  nextLevelAlias: state.level.nextLevelAlias,
  ansCheck: state.level.ansCheck,
  clearLevel: state.clearLevel,
});

const mapDispatchToProps = dispatch => ({
  getLevel: (alias) => {
    dispatch(actions.getLevel(alias));
  },
  getLevelList: () => {
    dispatch(actions.getLevelList());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Level));
