import { Formik } from 'formik';
import axios from 'axios';
import { Link } from "react-router-dom";
import NavbarComponent from '../NavbarComponent';


const Register = () =>{
    return (
        <div className="maincontainer">
         <NavbarComponent/>
        <div className="register">
            <h1 className="display-4">Register</h1>
            <hr></hr>
            {formdata()}
        </div>
        </div>
    );
}

const formdata = () => (
    <Formik
        initialValues={{ email: '', password: '', role: '' }}
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
                alert(JSON.stringify(values, null, 2));
                axios.post('http://localhost:5000/api/auth/register', values).then((response) => {
                    <Link to="dashboard"/>
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
            /* and other goodies */
        }) => (

            <form onSubmit={handleSubmit}>
                <div className="form-group row">
                <label>Email</label>
                <input
                        style={{border: "1px solid lightblue"}}
                        className="form-control btn-md btn block"
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
                        className="form-control btn-md btn block"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                    {errors.password && touched.password && errors.password}
                    </div>
                    <br></br>
                    <div className="form-group row">
                        <label>Role</label>
                        <select
                            style={{border: "1px solid lightblue"}}
                            className="form-control btn-md btn block"
                            name='role'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.role}>
                            <option value="" label="Select a role" />
                            <option type="text" value={'agent'}>agent</option>
                            <option type="text" value={'customer'}>customer</option>
                        </select>
                        {errors.role && touched.role &&
                            <div className="input-feedback">
                                {errors.role}
                            </div>}
                    </div>
                    <br></br>
                    <div className="btngroup">
                    <button className="btn btn-primary btn-md" type="submit" disabled={isSubmitting}>
                            Submit
                    </button>
                     <Link className="btnregister" style={{ textDecoration: 'none' }} to="/Login">Login</Link>
                    </div>
            </form>
        )}
    </Formik>)

export default Register;