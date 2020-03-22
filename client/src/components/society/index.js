import React from 'react';
import { Route } from 'react-router-dom';
import Login from './signin/signin';

const Society = () => {
    return(
        <Route path='/' component={Login} />
    )
}

export default Society;