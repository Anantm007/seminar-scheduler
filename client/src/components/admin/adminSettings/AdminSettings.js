import React, {useEffect, useState, Fragment} from 'react'
// import Footer from '../layout/Footer';
import {getAdmin, Update, updateAdmin} from '../apiAdmin';
import Spinner from '../../layout/spinner/Spinner';

const AdminSettings = (props) => {

    const id = props.match.params.id;

    const [values, setValues] = useState({
        name: '',
        email: '',
        error: false,
        loading: false,
        success: false,
    });

    const {name, email, error, loading, success} = values;

    const loadAdmin = () => {
        setValues({...values, loading: true})
        getAdmin(id).then(data => {
            if(data.success === false)
            {         
                setValues({...values, error: data.message, loading: false});
            }

            else
            {
                setValues({...values, name: data.data.name, email: data.data.email})
            }
        })
    }


    useEffect(() => {
        loadAdmin();
        // eslint-disable-next-line
    }, [])


    const handleChange = name => e => {
        setValues({...values, [name]: e.target.value}) 
    }

    const clickSubmit = e => {
        e.preventDefault();
        setValues({...values, error: '', loading: true});

        Update( id, values)
        .then(data => {
            if(data.success === false)
            {
                setValues({...values, error: data.message, success: false, loading: false});
            }

            else
            {
                updateAdmin(data.data, () => {
                    setValues({...values, success: true, error: false, loading: false })
                })

            }
        })
    }

    const AdminForm = () => (

        <form className="mb-3" onSubmit={clickSubmit}>
                {showLoading()}

            <div className="form-group">
                <label>Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label>Email</label>
                <input className="form-control" value={email}/>
            </div>        

            <br/>
            <div className="text-center">
                <button className="btn btn-outline-primary">UPDATE</button>
                <br/><br />
                {showError()}
                {showSuccess()}
                {showLoading()}
            </div>
            <br/>
        </form>
    )


    const showError = () => (
        <div className="alert alert-danger" style={{display: error? '': 'none'}}>
            {error}
        </div>
    )

    const showSuccess = () => {
        return (<div className="alert alert-success" style={{display: success ? '': 'none'}}>
            Details updated Succesfully
        </div>)
    }

    const showLoading = () => (
        loading && <Spinner/>
    )


    return (
        <Fragment>
        <div style={{backgroundColor: '#c0ffb3', minHeight: '8rem', padding: '2rem', marginBottom: '2rem'}}>
            <h1>Update Your Details</h1>
        </div>
        <div className="row">
            <div className="col-md-8 offset-md-2">
                {AdminForm()}
            </div>
        </div>

    </Fragment>

    )
}

export default AdminSettings