import { useState } from "react";
import { Link, Outlet, Route, Router, useNavigate } from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';


function Dashboard() {
    let navigate = useNavigate();
    const [selectdNav, setSelectedNav] = useState(0);
    return (
        <div className="maincontainer">
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container">
            <a className="navbar-brand text-uppercase fw-bold" href="#">
                Car Rental System
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                <span className="navbar-toggler-icon" />
            </button>
        </div>
        </nav>
        <div className="dashboard">
        <hr />
            <div className="sideNav">
                <main>
                    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: "280px" }}>
                        <ul className="nav nav-pills flex-column mb-auto">
                            <nav>
                                <li className="nav-item">
                                    <a href="#" className={`nav-link text-white ${selectdNav===0&&'active'}`} aria-current="page" onClick={() => {
                                        navigate('/dashboard/cars')
                                        setSelectedNav(0);
                                    }}>
                                    <span><i className="fas fa-car"></i>&nbsp;&nbsp;</span>
                                        Car
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className={`nav-link text-white ${selectdNav===1&&'active'}`} onClick={() => {
                                        navigate('/dashboard/customers')
                                        setSelectedNav(1);

                                    }}>
                                    <span><i className="fas fa-user"></i>&nbsp;&nbsp;</span>
                                        Customer
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className={`nav-link text-white ${selectdNav===2&&'active'}`} onClick={() => {
                                         navigate('/dashboard/test')
                                         setSelectedNav(2);
                                    }}>
                                    <span><i className="fas fa-flag"></i>&nbsp;&nbsp;</span>
                                        Rental
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className={`nav-link text-white ${selectdNav===3&&'active'}`} onClick={() => {
                                         navigate('/dashboard/test')
                                         setSelectedNav(3);
                                    }}>
                                    <span><i className="fas fa-undo"></i>&nbsp;&nbsp;</span>
                                        Return
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className={`nav-link text-white ${selectdNav===4&&'active'}`} onClick={() => {
                                         navigate('/dashboard/test')  
                                         setSelectedNav(4);
                                         localStorage.clear();
                                         NotificationManager.info('Logged out successfully');
                                         navigate('/login')
                                    }}>
                                    <span><i className="fas fa-sign-out-alt"></i>&nbsp;&nbsp;</span>
                                        Logout
                                    </a>
                                </li>
                            </nav>
                        </ul>
                        <hr />
                    </div>
                </main>

            </div>
            <div class="main">
                <Outlet />
            </div>

        </div>
        </div>
    );
}

export default Dashboard;