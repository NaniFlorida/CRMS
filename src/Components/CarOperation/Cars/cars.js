import axios from "axios";
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import { Formik } from 'formik';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useDispatch, useSelector } from "react-redux";
import { GetCars,AddCar,DeleteCar,UpdateCar } from "../../../Redux/actions/CarAction";
// import { GetCars} from "../../../Redux/actions/CarAction";




const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#carsModal');

const Cars = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [typeEffect, setTypeEffect] = useState('');
    const [selectedObj, setSelectedObj] = useState({});
    const openModal = (type, obj) => {
        setSelectedObj(obj);
        setTypeEffect(type);
        setIsOpen(true);
    }
    const cars = useSelector(state => state.Cars);
    const dispatch = useDispatch();


    const afterOpenModal = () => {

    }
    const closeModal = () => {
        setIsOpen(false);
        setSelectedObj({});
    }

    useEffect(() => {
        dispatch(GetCars());
        return () => {
        }
    }, [0]);
    
    return (<div id="carsModal">
        <button className="btn btn-mg btn-primary" onClick={() => openModal('ADD', {})}>Create A Car</button>
        <br></br>
        <hr></hr>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Car Reg No</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Model</th>
                    <th scope="col">Available</th>
                </tr>
            </thead>
            <tbody>

                {cars.map((s) => (<tr>
                    <th scope="row">{s.id}</th>
                    <td>{s.carRegNo}</td>
                    <td>{s.brand}</td>
                    <td>{s.model}</td>
                    <td>{s.available ? 'Booked' : "Available"}</td>
                    <td><button className="btn btn-outline-success btn-sm" onClick={() => openModal('UPDATE', s)}>
                    <i className="fas fa-pencil-alt fa-sm"></i></button>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => openModal('DELETE', s)}>
                    <i className="fas fa-trash-alt fa-sm"></i></button></td>

                </tr>)
                )}
            </tbody>
        </table>
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Delete Modal"
        >
            {typeEffect === 'DELETE' ?
                (
                    <div>
                        <div classNameName="deletepopup">Are you sure! do you want to delete the car.</div>
                        <hr></hr>
                        <div>
                            <button classNameName="btn btn-outline-primary btn-sm" onClick={() => 
                                {dispatch(DeleteCar(selectedObj.id,() => {setIsOpen(false)}));}}>Sure</button>
                            <span>&nbsp;</span>
                            <button classNameName="btn btn-outline-danger btn-sm" onClick={() => closeModal()}>Close</button>
                        </div>
                    </div>
                ) : <div classNameName="carsModalAdd">
                    <Formik
                        initialValues={typeEffect === 'UPDATE' ? { id:selectedObj.id,carRegNo: selectedObj.carRegNo, brand: selectedObj.brand, model: selectedObj.model, available: selectedObj.available }  : { carRegNo: '', brand: '', model: '', available: "false" }}
                        validate={values => {
                            const errors = {};
                            if (!values.brand) {
                                errors.brand = 'Required';
                            }
                            if (!values.model) {
                                errors.model = 'Required';
                            }
                            if (!values.carRegNo) {
                                errors.carRegNo = 'Required';
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(values);
                            setTimeout(() => {
                                if (typeEffect === 'ADD') {
                                    dispatch(AddCar(values,() => {
                                        setIsOpen(false)
                                        setSelectedObj({});
                                    }));
                                    
                                }
                                else {
                                    dispatch(UpdateCar(values,() => {
                                        setIsOpen(false);
                                        setSelectedObj({});
                                    }));
                                }
                                    
                            }, 400);
                            setSubmitting(false);
                        }}>

                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                        }) => (

                            <form className="carform" onSubmit={handleSubmit}>
                            <div className="form-group row">
                               <div className="form-group col-md-6">
                                <label>Car Reg No</label>   
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="carRegNo"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.carRegNo}
                                    />
                                    {errors.carRegNo && touched.carRegNo && errors.carRegNo}
                                </div>
                                <div className="form-group col-md-6">
                                <label>Brand</label> 
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="brand"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.brand}
                                    />
                                    {errors.brand && touched.brand && errors.brand}

                                </div>
                                </div>
                                <br></br>
                                <div className="form-group row">
                                <div className="form-group col-md-6">
                                <label>Model</label>  
                                    <input
                                       className="form-control"
                                        type="text"
                                        name="model"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.model}
                                    />
                                    {errors.model && touched.model && errors.model}

                                </div>
                                <div className="form-group col-md-6">
                                <label>Available</label>  
                                    <select
                                        className="form-control"
                                        name='available'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.available}>
                                        <option value="" label="Select" />
                                        <option type="text" value={"true"}>Booked</option>
                                        <option type="text" value={"false"}>Available</option>
                                    </select>
                                    {errors.available && touched.available &&
                                        <div className="input-feedback">
                                            {errors.available}
                                        </div>}
                                </div>
                                </div>
                                <br></br>
                                <div className="form-group row col-md-12 ms-0">
                                    <button className="btn btn-primary btn-sm btn-block" type="submit" disabled={isSubmitting}>
                                            Submit
                                    </button>    
                                </div> 
                            </form>
                        )}
                    </Formik>
                </div>}
        </Modal>

    </div>);
}


export default Cars;


