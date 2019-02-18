import React from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';

const jwtDecode = require('jwt-decode');

const checkOnboard = () => {
  if (!sessionStorage.getItem('jwtToken')) {
    return false;
  }
  return (!jwtDecode(sessionStorage.getItem('jwtToken')).user.onboard);
};

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
};

const Socket = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (checkOnboard() ? renderMergedProps(Component, matchProps, rest) : <Redirect to="/" />)
    }
  />
);

Socket.propTypes = {
  component: () => null,
};

Socket.defaultProps = {
  component: () => null,
};

export default withRouter(Socket);
