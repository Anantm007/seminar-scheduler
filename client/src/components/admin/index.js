import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Signin from './signin/signin';

const Admin = () => {
    return(
        <Route path='/' component={Signin} />
    )
}

export default Admin;