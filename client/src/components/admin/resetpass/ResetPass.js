import React, {useState} from 'react';
import {updatePassword} from '../../adminAuth';

const ResetPass = (props) => {
    
    const token = props.match.params.token;
    
    const [values, setValues] = useState({
        password: '',
        confirmPassword: '',
        error: '',
        success: false,
    });

    const {password, confirmPassword, error, success} = values;

    const handleChange = name => e => {
        setValues({...values, error: '', [name]: e.target.value})
    };

    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({...values, error: ''});

        if(password !== confirmPassword)
        {
          setValues({...values, error: "Passwords do not Match" });
          return;
        }  

        updatePassword({password}, token)
        .then(data => {
            if(data.success === false)
            {
                setValues({...values, error: data.message, success: false})
            }
            else
            {
                setValues({...values, name: '', email: '', description: '', success: true});
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
            Your password has been reset successfully. Please login now!
        </div>)
    }

    return (

    <div className="container" style={{marginTop: "5rem"}}>    
        <div id="loginbox" style={{marginTop:"50px;"}} className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">                    
            <div className="panel panel-info" >
                    <div className="panel-heading">
                        <div className="panel-title"><h3>ENTER NEW PASSWORD</h3></div>    </div>     

                    <div style={{paddingTop:"30px"}} className="panel-body" >

                        <div style={{display:"none"}} id="login-alert" className="alert alert-danger col-sm-12"></div>
                            
                            <form>
                                    
                                <div style={{marginBottom: "25px"}} className="input-group">
                                            <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                                            <input onChange={handleChange('password')} value={password} type="password" className="form-control" placeholder="Password" />
                                </div>
                                        
                                <div style={{marginBottom: "25px"}} className="input-group">
                                            <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                                            <input onChange={handleChange('confirmPassword')} value={confirmPassword} type="password" className="form-control" placeholder="Confirm Password" />
                                </div>        
                                
                                <div style={{marginTop:"50px;"}} className="form-group">
                                    <div className="col-sm-12 controls text-center">
                                        <a href="/#" onClick={clickSubmit} className="btn btn-primary">RESET</a>
                                        <br /><br />
                                        {showError()}
                                        {showSuccess()}
                                        <br /><br /><br /><br /><br /><br /><br /><br />
                                    </div>
                                </div>
                                        
                            </form>     

                    </div>                     
             </div>  
        </div>   
                
    </div> 
    
    )
}

export default ResetPass