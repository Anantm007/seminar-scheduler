import React, { Fragment, useState } from 'react';
import Spinner from '../spinner/Spinner';

import {checkSlot} from '../apiLayout';

const CheckAvailableSlot = () => {

    const [values, setValues] = useState({
        eventDate: 'YYYY-MM-DD',
        seminarHall: '',
        startTime: '',
        endTime: '',
        loading: false,
        error: false,
        success: false,
    });

    const {eventDate, seminarHall, startTime, endTime, loading, error, success} = values;

    const handleChange = name => e => {
        setValues({...values, error: false, [name]: e.target.value})
    };

    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({...values, error: false, loading: true});
        console.log(eventDate, seminarHall, startTime, endTime)
        checkSlot({eventDate, seminarHall, startTime, endTime})
        .then(data => {
            if(data.success === false)
            {
                setValues({...values, error: data.message, loading: false})
            }
            else
            {
                setValues({...values, success: true, loading: false});
            }
        })

    }


    const showError = () => {
        return (<div className="alert alert-danger" style={{display: error ? '': 'none'}}>
            {error}
        </div>
        )
    }

    
    const showSuccess = () => {
        return (<div className="alert alert-success" style={{display: success ? '': 'none'}}>
            Slot is Free
        </div>
        )
    }

    const showLoading = () => 
            loading && <Spinner/>


    return (
        <Fragment>
        <div>
        
            <select onChange={handleChange('seminarHall')} className="selectpicker" data-show-subtext="true" style={{margin: '1rem'}}>
                <option selected={true} disabled="disabled">Seminar Hall Number</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>

            <label htmlFor="eventDate">Date Of Seminar</label>
            <input type="text" onChange={handleChange('eventDate')} name="eventDate" value={eventDate}/>            

            <select onChange={handleChange('startTime')} className="selectpicker" data-show-subtext="true" style={{margin: '1rem'}}>
                <option selected={true} disabled="disabled">Starting Time</option>
                <option value="0800">8:00 AM</option>
                <option value="0900">9:00 AM</option>
                <option value="1000">10:00 AM</option>
                <option value="1100">11:00 AM</option>
                <option value="1200">12:00 PM</option>
                <option value="1300">1:00 PM</option>
            </select>

            
            <select onChange={handleChange('endTime')} className="selectpicker" data-show-subtext="true" style={{margin: '1rem'}}>
                <option selected={true} disabled="disabled">Ending Time</option>
                <option value="0900">9:00 AM</option>
                <option value="1000">10:00 AM</option>
                <option value="1100">11:00 AM</option>
                <option value="1200">12:00 PM</option>
                <option value="1300">1:00 PM</option>
            </select>
        
        </div>
        
        <div className="text-center">
          <button onClick={clickSubmit} className="btn btn-primary text-center">Check</button>
          <br/>
          {showError()}
          {showLoading()}
          {showSuccess()}
        </div>
        
        </Fragment>
    )
}

export default CheckAvailableSlot;