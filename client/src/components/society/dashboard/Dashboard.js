import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {isAuthenticatedSociety} from '../../societyAuth';


const Dashboard = () => {
    const {society: {_id, name, email}} = isAuthenticatedSociety();

    const societyLinks = () => {
        return (
            <div className="card mb-5">
                <h4 className="card-header text-center">Society Links</h4>
                <ul className="list-group">
                    <li className="list-group-item"><Link to="/society/check" className="nav-link">Check Slot</Link></li>
                    <li className="list-group-item"><Link to='/society/book' className="nav-link">Book Slot</Link></li>
                </ul>

            </div>
        )
    }

    const societyInfo = () => {
        return (
            <div className="card mb-5">
            <h3 className="card-header text-center">Society Information</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{`Society id : ${_id}`}</li>
            </ul>
            </div>
        )
    }

    return (
        <Fragment>
            <div style={{backgroundColor: '#c0ffb3', minHeight: '8rem', padding: '2rem', marginBottom: '2rem'}}>
                <h1>{`Welcome, ${name}`}</h1>
            </div>
            <div className="row">
                <div className="xs-col-12 col-sm-4">
                    {societyLinks()}
                </div>

                <div className="xs-col-12 col-sm-8">
                    {societyInfo()}
                </div>
            </div>
        </Fragment>
)

}

export default Dashboard