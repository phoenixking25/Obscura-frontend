import React from 'react';
import { connect } from 'react-redux';
import Countdown from 'react-count-down';
import actions from '../../../actions';
import config from '../../../config';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.pathName = '';
    this.state = {
      css: '',
    };

    // countdown options
    this.OPTIONS = {
      endDate: config.startDate,
      prefix: '',
      // callback function after countdown stops.
      cb: () => {
        props.getCurrentLevelAlias();
        props.getLevelList();
      },
    };
  }

  componentDidMount() {
    // changing css of the countdown to hide it.
    if (this.startTime < new Date()) {
      this.setState({
        css: 'hide',
      });
    }
  }

  renderTimer = () => {
    const shouldShowTimer = true;
    // const shouldShowTimer = this.startTime > new Date();
    if (shouldShowTimer) {
      return (
        <a href="#!" className="white-text" style={{ width: '10%' }}>
          <Countdown options={this.OPTIONS} />
        </a>
      );
    }
    return '';
  }

  render() {
    const path = window.location.href;
    if (path.includes('dashboard')) {
      this.pathName = 'Dashboard';
    } else if (path.includes('leaderboard')) {
      this.pathName = 'Leaderboard';
    } else if (path.includes('support')) {
      this.pathName = 'Support';
    } else if (path.includes('level')) {
      this.pathName = 'Arena';
    } else if (path.includes('our-team')) {
      this.pathName = 'Our Team';
    } else if (path.includes('team')) {
      this.pathName = 'Team Page';
    } else {
      this.pathName = '';
    }

    const timer = this.renderTimer();

    const { loading } = this.props;
    const { css } = this.state;
    return (
      <div className="head navbar-fixed">
        <nav>
          <a href="#!" data-target="slide-out0" className="sidenav-trigger hide-on-large-only left">
            <i className="material-icons">
              menu
            </i>
          </a>
          <div className="nav-wrapper grey darken-3 center">
            <div className="left">
              <div className="breadcumb" />
              <a href="#!" className="breadcrumb">
                {this.pathName}
              </a>
            </div>

            <div className={css}>
              {timer}
            </div>

            <a href="#!" className="brand-logo right">
              <img
                src="/images/logo2.svg"
                width="75"
                alt="logo"
              />
            </a>
          </div>
        </nav>
        <div className={loading ? 'progress grey lighten-4' : 'progress grey lighten-4 hide'}>
          <div className="indeterminate grey" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
});


const mapDispatchToProps = dispatch => ({
  getCurrentLevelAlias: () => {
    dispatch(actions.getAlias());
  },
  getLevelList: () => {
    dispatch(actions.getLevelList());
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(Header);
