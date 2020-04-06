import React, {Fragment, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {signin, authenticate, isAuthenticatedSociety} from '../../societyAuth';
import { Form, Button, Card } from 'react-bootstrap';

import Spinner from '../../layout/spinner/Spinner';
import ForgotPass from '../forgotpass/ForgotPass';
 
const Login = () => {

    const [values, setValues] = useState({
        email: 'anant.mathur007@gmail.com',
        password: 'anantmathur',
        error: '',
        loading: false
    });

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
                window.location.reload(false);
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
        if(isAuthenticatedSociety())
        {
            return <Redirect to="/society/dashboard" />
        }
    }

    const signUpForm = () => (
        <Card sm={8} style={{ "margin": "20px" }}>
            <Card.Body>
            <h1 className="text-center">Society Login</h1>
            <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={handleChange('email')} type="email" placeholder="Enter email" value={email} />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={handleChange('password')} type="password" placeholder="Password" value={password} />
            </Form.Group>

            <div className="container">
                <a href="/#" data-target="#pwdModal" data-toggle="modal">Forgot my password</a>
            </div>
            <ForgotPass id="pwdModal" />

            <div className="text-center">
            <Button variant="primary" onClick={clickSubmit}>
                LOGIN
            </Button>
            </div>

            </Form>
            </Card.Body>
        </Card>
        // <div className="limiter">
        //     <div className="container-login100">
        //         <div className="wrap-login100">
        //             <div className="login100-form-title">
        //                 <span className="login100-form-title-1">
        //                     Society Sign In
        //                 </span>
        //             </div>
        //             <form className="login100-form validate-form">
        //                 <div className="wrap-input100 validate-input m-b-26" data-validate="Username is required">
        //                     <span className="label-input100">Email</span>
        //                     <input onChange={handleChange('email')} className="input100" type="email" value={email} placeholder="Enter Email" />
        //                     <span className="focus-input100"></span>
        //                 </div>

        //                 <div className="wrap-input100 validate-input m-b-18" data-validate = "Password is required">
        //                     <span className="label-input100">Password</span>
        //                     <input onChange={handleChange('password')} className="input100" type="password" value={password} placeholder="Enter Password" />
        //                     <span className="focus-input100"></span>
        //                 </div>

        //                 <div className="container">
        //                     <a href="/#" data-target="#pwdModal" data-toggle="modal">Forgot my password</a>
        //                 </div>
        //                 <ForgotPass id="pwdModal" />


        //                 <div className="container-login100-form-btn">
        //                     <button onClick={clickSubmit} type="submit" className="login100-form-btn">
        //                         Login
        //                     </button>
        //                 </div>
        //             </form>
        //         </div>
        //     </div>
        // </div>
    );

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

export default Login;
