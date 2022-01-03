import { reduxForm, Field } from 'redux-form';
import { Formik } from 'formik';
import axios from 'axios';
import { Link,useNavigate  } from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import NavbarComponent from '../NavbarComponent';



function Login() {
    return (
        <div className="maincontainer">
        <NavbarComponent/>
        <div className="login">
            <h1 className="display-4">Login</h1>
            {Formdata()}
        </div>
        </div>
    );
}

const Formdata = () => {
    let navigate = useNavigate();

return (<Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
            const errors = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }
            return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
                axios.post('http://localhost:5000/api/auth/login',values).then((response) => {
                     localStorage.setItem('token',JSON.stringify(response.data));
                     NotificationManager.success('Logged in successfully', 'Login');
                     navigate(`/dashboard`);
                  }).catch(s => {
                    NotificationManager.error('invalid username and password');
                  });
                setSubmitting(false);
            }, 400);
        }}
    >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
        }) => (

            <form onSubmit={handleSubmit}>
                <div className="form-group row">
                <label>Email</label>
                    <input
                        style={{border: "1px solid lightblue"}}
                        className="form-control btn-lg btn block"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                    />
                    {errors.email && touched.email && errors.email}
                </div>
                <br></br>
                <div className="form-group row">
                <label>Password</label>
                    <input
                        style={{border: "1px solid lightblue"}}
                        className="form-control btn-lg btn block"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                    {errors.password && touched.password && errors.password}
                    
                </div>
                <br></br>
                <div className="btngroup">
                <button className="btn btn-primary btn-md" type="submit" disabled={isSubmitting}>
                        Submit
                </button>
                <Link className="btnregister" style={{ textDecoration: 'none' }} to="/register">Register</Link>
                </div>
            </form>
        )}
    </Formik>)}

    export default Login;