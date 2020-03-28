import React from 'react'
import {isAuthenticatedSociety} from '../../societyAuth';

const Dashboard = () => {

    const {society: {name}} = isAuthenticatedSociety();

    return (
        <div>
           <h1>Welcome, {name}</h1> 
        </div>
    )
}

export default Dashboard;
