import React, {Fragment, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {signin, authenticate, isAuthenticated} from '../../adminAuth';

import './signin.css';
import './util.css';

import Spinner from '../../layout/spinner/Spinner';


const Signin = () => {

    const [values, setValues] = useState({
        email: 'anantcodesweb@gmail.com',
        password: '123456',
        error: '',
        loading: false
    })

    const {email, password, error, loading} = values;
    
    const handleChange = name => e => {
        setValues({...values, error: false, [name]: e.target.value})
    };

    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({...values, error: false, loading: true});
        signin({email, password})
        .then(data => {
            console.log(data)
            if(data.success === false)
            {
                setValues({...values, error: 'Login Failed', loading: false})
            }
            else
            {
                window.location.reload(false); // To reload the page for navbar updation
                authenticate(data, () => {
                    setValues({...values, success: true, loading: false});
                })
            }
        })

    }

    const showError = () => {
        return (<div className="alert alert-danger" style={{display: error ? '': 'none'}}>
            {error}
        </div>
        )
    }

    const showLoading = () => 
        
            loading && <Spinner/>

    const redirectUser = () => {
            if(isAuthenticated())
            {
                return <Redirect to="/admin/dashboard" />
            }
    }

    const signUpForm = () => (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <div className="login100-form-title">
                        <span className="login100-form-title-1">
                            Admin Sign In
                        </span>
                    </div>
                    <form className="login100-form validate-form">
                        <div className="wrap-input100 validate-input m-b-26" data-validate="Username is required">
                            <span className="label-input100">Email</span>
                            <input onChange={handleChange('email')} className="input100" type="email" value={email} placeholder="Enter Email" />
                            <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100 validate-input m-b-18" data-validate = "Password is required">
                            <span className="label-input100">Password</span>
                            <input onChange={handleChange('password')} className="input100" type="password" value={password} placeholder="Enter Password" />
                            <span className="focus-input100"></span>
                        </div>

                        <div className="container-login100-form-btn">
                            <button onClick={clickSubmit} className="login100-form-btn">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
     )

    return (
        loading ? <div>{showLoading()}</div> : (<Fragment>
            <div>
                {showError()}
                {showLoading()}
                {redirectUser()}
                {signUpForm()}
            </div>
        </Fragment>)
           
    )
};


export default Signin;