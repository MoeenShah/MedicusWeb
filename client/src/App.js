import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import HomePatient from './components/pages/HomePatient';
import HomeDoctor from './components/pages/HomeDoctor';
import About from './components/pages/About';
import Support from './components/pages/Support';
import Register from './components/auth/Register';
import RegisterPatient from './components/auth/RegisterPatient';
// import RegisterDoctor from './components/auth/RegisterDoctor';
import Login from './components/auth/Login';
import LoginPatient from './components/auth/LoginPatient';
import LoginDoctor from './components/auth/LoginDoctor';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';

import DoctorState from './context/doctor/DoctorState';
import PatientState from './context/patient/PatientState';
import AuthState from './context/auth/AuthState';
import AppointmentState from './context/appointment/AppointmentState';
// import AuthStatePatient from './context/authPatient/AuthState';
import AlertState from './context/alert/AlertState';
import './App.css';
import DoctorApply from './components/pages/DoctorApply';

const App = () => {
  return (
    <AuthState>
      <DoctorState>
        <PatientState>
        <AppointmentState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Alerts />
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <PrivateRoute exact path='/Patient' component={HomePatient} />
                  <PrivateRoute exact path='/Doctor' component={HomeDoctor} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/doctorapply' component={DoctorApply} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/registerPatient' component={RegisterPatient} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/loginPatient' component={LoginPatient} />
                  {/* <Route exact path='/registerDoctor' component={RegisterDoctor} /> */}
                  <Route exact path='/loginDoctor' component={LoginDoctor} />
                  <Route exact path='/support' component={Support} />
                </Switch>
              </div>
              <Footer />
            </Fragment>
          </Router>
        </AlertState>
        </AppointmentState>
        </PatientState>
      </DoctorState>
    </AuthState>
  );
};

export default App;
