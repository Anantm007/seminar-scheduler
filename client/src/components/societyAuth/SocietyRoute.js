import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticatedSociety } from "./index";

const SocietyRoute = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticatedSociety() ? (
        <Component {...props} />
      ) : (
        <Redirect to='/society/signin' />
      )
    }
  />
);

export default SocietyRoute;