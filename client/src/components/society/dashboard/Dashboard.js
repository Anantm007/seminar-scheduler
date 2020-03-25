import React from 'react'
import {isAuthenticated} from '../../societyAuth';

const Dashboard = () => {

    const {society: {name}} = isAuthenticated();

    return (
        <div>
           <h1>Welcome, {name}</h1> 
        </div>
    )
}

export default Dashboard;
