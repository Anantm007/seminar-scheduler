import React from 'react';
import './signin.css';
import './util.css';


class Signin extends React.Component{
    constructor(props){
        super()
        this.state={
            signInEmail: '',
            signInPassword: ''
        }
    }
    onEmailChange = (event) => { 
        this.setState({signInEmail: event.target.value})
        console.log(this.state.signInEmail)
    }
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
        console.log(this.state.signInPassword)
    }
    onSubmitSignIn = () => {
        fetch('url jo bhi hai', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        }).then(response=>response.json()).then(data=>{
            if(data.user){
                // Jo bhi krna hai yaha dekhle
            }
            else{
				alert("Incorrect Email/Password");
			}
        })
    }
    render(){
        return(
            <div class="limiter">
                <div class="container-login100">
                    <div class="wrap-login100">
                        <div class="login100-form-title">
                            <span class="login100-form-title-1">
                                Sign In
                            </span>
                        </div>
                        <form class="login100-form validate-form">
                            <div class="wrap-input100 validate-input m-b-26" data-validate="Username is required">
                                <span class="label-input100">Email</span>
                                <input onChange={this.onEmailChange} class="input100" type="email" name="email" placeholder="Enter Email" />
                                <span class="focus-input100"></span>
                            </div>

                            <div class="wrap-input100 validate-input m-b-18" data-validate = "Password is required">
                                <span class="label-input100">Password</span>
                                <input onChange={this.onPasswordChange} class="input100" type="password" name="pass" placeholder="Enter Password" />
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
                                <button onClick={this.onSubmitSignIn} class="login100-form-btn">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signin;