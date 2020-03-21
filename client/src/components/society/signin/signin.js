import React, {Fragment, useState} from 'react';
 
const Login = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        loading: false,
    });

    const {email, password, loading} = values;

    const handleChange = name => e => {
        setValues({...values, error: false, [name]: e.target.value})
    };
    
        const clickSubmit = (e) => {
        e.preventDefault();
        setValues({...values, error: false, loading: true});
/*        signin({email, password})
        .then(data => {
            if(data.success === false)
            {
                setValues({...values, error: data.message, loading: false})
            }
            else
            {
                setValues({...values, loading: false});
            }
        })*/

    }

    const signUpForm = () => (
        <div className="container">
                    <br/><br/>  
                    
                    <div className="card bg-light">
                    <article className="card-body mx-auto" style={{maxWdith: "400px"}}>
                        <h4 className="card-title mt-3 text-center">SOCIETY LOGIN</h4>
                        
                        <form>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                                </div>
                                <input onChange={handleChange('email')} type="email" value={email} className="form-control" placeholder="Your Email address" />
                            </div> 
                            
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                                </div>
                                <input onChange={handleChange('password')} value={password} className="form-control" placeholder="Enter a Password" type="password" />
                            </div> 
                            
                            <br />
                            <div className="form-group">
                                <button onClick={clickSubmit} className="btn btn-primary btn-block"> Sign In</button>
                            </div>  
                            <br />

                    </form>
                    <br /><br />
                    </article>
                    </div> 
                </div>
    );

    return (
        <Fragment>
            <div>
                {signUpForm()}
            </div>
        </Fragment>
           
    )
};

export default Login;