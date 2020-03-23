import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from "./index";

const AdminRoute = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to='/admin/signin' />
      )
    }
  />
);

export default AdminRoute;