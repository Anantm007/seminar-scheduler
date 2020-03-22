import React, { useState } from 'react';
import './signin.css';
import './util.css';


const Signin = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        loading: false
    })

    const {email, password, loading} = values;
    
    const handleChange = name => e => {
        setValues({...values, error: false, [name]: e.target.value})
    };

    const onSubmitSignIn = () => {
        // fetch('url jo bhi hai', {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({
        //         email: this.state.signInEmail,
        //         password: this.state.signInPassword
        //     })
        // }).then(response=>response.json()).then(data=>{
        //     if(data.user){
        //         // Jo bhi krna hai yaha dekhle
        //     }
        //     else{
		// 		alert("Incorrect Email/Password");
		// 	}
        // })
        alert(email + password)
    }
    return(
        <div class="limiter">
            <div class="container-login100">
                <div class="wrap-login100">
                    <div class="login100-form-title">
                        <span class="login100-form-title-1">
                            Admin Sign In
                        </span>
                    </div>
                    <form class="login100-form validate-form">
                        <div class="wrap-input100 validate-input m-b-26" data-validate="Username is required">
                            <span class="label-input100">Email</span>
                            <input onChange={handleChange('email')} class="input100" type="email" value={email} placeholder="Enter Email" />
                            <span class="focus-input100"></span>
                        </div>

                        <div class="wrap-input100 validate-input m-b-18" data-validate = "Password is required">
                            <span class="label-input100">Password</span>
                            <input onChange={handleChange('password')} class="input100" type="password" value={password} placeholder="Enter Password" />
                            <span class="focus-input100"></span>
                        </div>

                        <div class="flex-sb-m w-full p-b-30">
                            {/* <div class="contact100-form-checkbox">
                                <input class="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                                <label class="label-checkbox100" for="ckb1">
                                    Remember me
                                </label>
                            </div> */}

                            <div>
                                <a href= "#" class="txt1">
                                    Forgot Password?
                                </a>
                            </div>
                        </div>

                        <div class="container-login100-form-btn">
                            <button onClick={onSubmitSignIn} class="login100-form-btn">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
    }


export default Signin;