import React, {useState} from 'react'
import {forgot} from '../../societyAuth';
import Spinner from '../../layout/spinner/Spinner';

const ForgotPass = () => {
    
    const [values, setValues] = useState({
        email: '',
        error: '',
        success: false,
        loading: false,
    });

    const {email, loading, success, error} = values;

    const handleChange = name => e => {
        setValues({...values, error: false, [name]: e.target.value})
    };

    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({...values, error: false, loading: true});
        forgot({email})
        .then(data => {
            if(data.success === false)
            {
                setValues({...values, error: data.message, success: false, loading: false})
            }
            else
            {
                setValues({...values, success: true, error: false, loading: false});    
            }
        })

    }

    const showLoading = () => 
        
    loading && <Spinner/>


    
    const showError = () => {
        return (<div className="alert alert-danger" style={{display: error ? '': 'none'}}>
            {error}
        </div>
        )
    }

    const showSuccess = () => {
        return (<div className="alert alert-success" style={{display: success ? '': 'none'}}>
            Instructions to reset password have been sent! Please check your email
        </div>)
    }


    return (
        <div id="pwdModal" className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="text-center">Forgot Your Password?</h1>
                            </div>
                            <div className="modal-body">
                                <div className="col-md-12">
                                        <div className="panel panel-default">
                                            <div className="panel-body">
                                                <div className="text-center">
                                                
                                                <p>If you have forgotten your password you can reset it here.</p>
                                                    <div className="panel-body">
                                                        <div className="form-group">
                                                            <input className="form-control input-lg" placeholder="E-mail Address" onChange={handleChange('email')} type="email" value={email} />
                                                        </div>
                                                        <button onClick={clickSubmit} className="btn btn-lg btn-primary btn-block">Submit</button>  
                                                        <br />
                                                        {showLoading()}                      
                                                        {showError()}
                                                        {showSuccess()}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <div className="modal-footer">
                                <div className="col-md-12 text-right">
                                <button className="btn" data-dismiss="modal" aria-hidden="true">Cancel</button>
                                </div>	
                            </div>
                        </div>
                    </div>
        </div>
    )
}

export default ForgotPass