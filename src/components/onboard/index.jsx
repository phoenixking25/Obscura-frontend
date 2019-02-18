import React from 'react';
import loadjs from 'loadjs';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from './form';

class Onboard extends React.Component {
  constructor(props) {
    super(props);
    loadjs([
      'js/init.js',
    ]);
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.onboard) {
      nextProps.history.push('/dashboard');
    }
  };

  render() {
    const { user } = this.props;
    return (
      <div className="row center grey darken-3 onboard-back">
        <div className="col s12 l8 offset-l2">
          <div className="card z-depth-5">
            <div className="card-content white-text">

              <div className="row">
                <div className="col s12 m6" />
                <div className="col s12 m6">
                  <ul className="tabs grey-text">
                    <li className="tab col s12">
                      <a href="#test1" className="grey-text text-darken-3">
                        Basic Details
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col s12 m6">
                  <div className="valign-wrapper" style={{ height: '80vh' }}>
                    <img src="/images/avatars/10.png" alt="pockedex" width="100%" />
                  </div>
                </div>
                <div className="col s12 m6">
                  <div id="test1" className="col s12">
                    <Form user={user} />
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

const mapStateToProps = state => ({
  onboard: state.user.onboard,
  userData: state.user.userData,
});

Onboard.propTypes = {
  // history: PropTypes.func.isRequired,
  onboard: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};


export default withRouter(connect(mapStateToProps)(Onboard));
