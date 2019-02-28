import React from 'react';
import { FacebookLogin } from 'react-facebook-login-component';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import SweetAlert from '../shared/sweetAlert';
import actions from '../../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    const { clearUser } = this.props;
    clearUser();
  }

  componentWillReceiveProps = (nextProps) => {
    const { history } = this.props;
    if (nextProps.loggedin && nextProps.onboard) {
      history.push('/dashboard');
    } else if (nextProps.loggedin && !nextProps.onboard) {
      history.push('/onboard');
    }
  };

  responseGoogle = (response) => {
    if (!response.tokenId) {
      SweetAlert('Google login failed! Try Again', 'error');
      // return;
    } else {
      SweetAlert('Logging you in!', 'success');
      const { login } = this.props;
      login(response.tokenId, 'google');
    }
  };

  responseFacebook = (response) => {
    if (!response.accessToken) {
      SweetAlert('Facebook login failed! Try Again', 'error');
      // return;
    } else {
      const { login } = this.props;
      SweetAlert('Logging you in!', 'success');
      login(response.accessToken, 'facebook');
    }
  };

  render() {
    return (
      <div className="center-align">
        <div>
          <GoogleLogin
            clientId="399776476412-krcjea92jdlp48l9b8ctjd23gmh7q997.apps.googleusercontent.com"
            buttonText="Google Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            className="btn z-depth-0 loginButton"
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <FacebookLogin
            socialId="482076445491176"
            language="en_US"
            scope="public_profile,email"
            responseHandler={this.responseFacebook}
            xfbml
            fields="id,email,name,picture"
            version="v2.5"
            className="btn z-depth-0 loginButton"
            buttonText="Facebook Login"
          />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: () => null,
  clearUser: () => null,
  loggedin: PropTypes.bool,
  onboard: PropTypes.bool,
  history: () => null,
};

Login.defaultProps = {
  clearUser: () => null,
  login: () => null,
  loggedin: false,
  onboard: false,
  history: () => null,
};

const mapStateToProps = state => ({
  onboard: state.user.onboard,
  loggedin: state.user.loggedin,
});

const mapDispatchToProps = dispatch => ({
  login: (token, provider) => {
    dispatch(actions.login(token, provider));
  },
  clearUser: () => {
    dispatch(actions.clearUser());
  },
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Login),
);
