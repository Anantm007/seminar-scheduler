import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from "./index";

const SocietyRoute = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to='/society/signin' />
      )
    }
  />
);

export default SocietyRoute;