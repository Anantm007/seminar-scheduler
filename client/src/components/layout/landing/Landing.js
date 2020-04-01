import React, { Fragment } from 'react';
import './landing.css';
import CheckAvailableSlot from '../checkAvailableSlot/CheckAvailableSlot';

const Landing = () => {

    return (
        <Fragment>
        <div>
            <div style={{marginTop: '5rem', textAlign: 'center'}}>
                <h1 className="x-large text-primary">
                    Seminar Scheduler MSIT<br/><br/>
                    <br/>
                </h1>
            </div>
        <CheckAvailableSlot/>
        </div>
        
        </Fragment>
    )
}

export default Landing