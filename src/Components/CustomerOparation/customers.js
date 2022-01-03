import axios from "axios";
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { GetCustomers, AddCustomers, DeleteCustomers, UpdateCustomers } from "../../Redux/actions/CustomerAction";


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


const Customers = () => {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [typeEffect, setTypeEffect] = useState('');
    const [selectedObj, setSelectedObj] = useState({});
    const openModal = (type, obj) => {
        setSelectedObj(obj);
        setTypeEffect(type);
        setIsOpen(true);
    }
    const customers = useSelector(state => state.Customers);
    //hello world
    const dispatch = useDispatch();


    const afterOpenModal = () => {

    }
    const closeModal = () => {
        setIsOpen(false);
        setSelectedObj({});
    }

    useEffect(() => {
        dispatch(GetCustomers());
        console.log(customers);
        return () => {
        }
    }, [0]);
    const numPages = (count = 10) => {
        console.log(Math.ceil(customers.count/count));
        return Math.ceil(customers.count/count);
    }
    const prevPage = () => {

        if (customers.pageNumber > 1) {
            var pagenum = customers.pageNumber - 1;
            dispatch(GetCustomers(10,pagenum));
        }
    }
    const nextPage = () => {
        if (customers.pageNumber < numPages()) {
            var pageNum = customers.pageNumber + 1;
            dispatch(GetCustomers(10,pageNum));
        }
    }

    return (
        <div id="customerModal">
            <button className="btn btn-mg btn-primary" onClick={() => openModal('ADD', {})}>Create A Customer</button>
            <br></br>
            <hr></hr>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Customer Id</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Mobile No</th>
                    </tr>
                </thead>
                <tbody>

                    {customers.list.map((s) => (<tr>
                        <th scope="row">{s.id}</th>
                        <td>{s.id}</td>
                        <td>{s.customerName}</td>
                        <td>{s.custAddress}</td>
                        <td>{s.mobileNo}</td>
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
                            <div className="deletepopup">Are you sure! do you want to delete the customer.</div>
                            <hr></hr>
                            <div>
                                <button className="btn btn-outline-primary btn-sm" onClick={() => { dispatch(DeleteCustomers(selectedObj.id, () => { setIsOpen(false) })); }}>Sure</button>
                                <span>&nbsp;</span>
                                <button className="btn btn-outline-danger btn-sm" onClick={() => closeModal()}>Close</button>
                            </div>
                        </div>
                    ) : <div className="customerModalAdd">
                        <Formik
                            initialValues={typeEffect === 'UPDATE' ? {
                                id: selectedObj.id,
                                customerName: selectedObj.customerName,
                                custAddress: selectedObj.custAddress,
                                mobileNo: selectedObj.mobileNo
                            }
                                : { customerName: '', custAddress: '', mobileNo: '' }}

                            validate={values => {
                                const errors = {};
                                // if (!values.customerId) {
                                //     errors.customerId = 'Required';
                                // }
                                if (!values.customerName) {
                                    errors.customerName = 'Required';
                                }
                                if (!values.mobileNo) {
                                    errors.mobileNo = 'Required';
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                console.log(values);
                                console.log();
                                setTimeout(() => {
                                    if (typeEffect === 'ADD') {
                                        dispatch(AddCustomers(values, () => {
                                            setIsOpen(false)
                                            setSelectedObj({});
                                        }));

                                    }
                                    else {
                                        dispatch(UpdateCustomers(values, () => {
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
                                            <label>Customer Name</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="customerName"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.customerName}
                                            />
                                            {errors.customerName && touched.customerName && errors.customerName}

                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="form-group row">
                                        <div className="form-group col-md-6">
                                            <label>Address</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="custAddress"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.custAddress}
                                            />
                                            {errors.custAddress && touched.custAddress && errors.custAddress}

                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Mobile No</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="mobileNo"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.mobileNo}
                                            />
                                            {errors.mobileNo && touched.mobileNo &&
                                                <div className="input-feedback">
                                                    {errors.mobileNo}
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
            <div className="table-bottom">
            <div>
            <span className="count">{customers.pageNumber===1? 1:customers.pageNumber*10-9}-{customers.count < (10*customers.pageNumber)?(customers.count):(10*customers.pageNumber)} of {customers.count}</span>
            <a onClick={() => {prevPage()}} ><span className="left-arrow"><i class="fas fa-chevron-left"></i></span></a>
            <a onClick={() => {nextPage()}}><span className="right-arrow"><i class="fas fa-chevron-right"></i></span></a>
            </div>
                
            </div>
        </div>
    )
};

export default Customers;