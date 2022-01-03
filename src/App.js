// import logo from './logo.svg';

import { NotificationContainer } from 'react-notifications';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import './App.css';
import Cars from './Components/CarOperation/Cars';
import Customers from './Components/CustomerOparation';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import NotFoundPage from './Components/NotFoundPage';
import Register from './Components/Register';
import PrivateRoute from './Helpers/PrivateRoute';
import Store from './Redux/store';


function App() {
  return (
    <Provider store={Store}>
      <div className="App">
        <RoutesMain />
        <NotificationContainer />
      </div>
    </Provider>
  );
}

const RoutesMain = () => (<Router>
  <div className="App">
    <ul className="App-header">
      {/* <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li> */}
    </ul>
    <Routes>
      <Route path="*" element={<NotFoundPage/>} />
      <Route exact path='login' element={< Login />}></Route>
      <Route exact path='register' element={< Register />}></Route>
      <Route exact path='dashboard' element={<PrivateRoute><Dashboard />  </PrivateRoute>}>
        <Route exact path='cars' element={<PrivateRoute><Cars /> </PrivateRoute>}></Route>
        <Route exact path='' element={<PrivateRoute><Cars /> </PrivateRoute>}></Route>
        <Route exact path='customers' element={<PrivateRoute><Customers /> </PrivateRoute>}></Route>
      </Route>
    </Routes>
  </div>
</Router>)

export default App;
