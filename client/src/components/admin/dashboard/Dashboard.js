import React from 'react'
import {isAuthenticated} from '../../adminAuth';

const Dashboard = () => {

    const {admin: {name}} = isAuthenticated();

    return (
        <div>
           <h1>Welcome, {name}</h1> 
        </div>
    )
}

export default Dashboard
