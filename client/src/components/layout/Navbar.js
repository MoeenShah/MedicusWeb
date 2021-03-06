import React, { Fragment, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import DoctorContext from '../../context/doctor/doctorContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const doctorContext = useContext(DoctorContext);

  const { isAuthenticated, logout, user, loadUser } = authContext;
  const { clearDoctors } = doctorContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
    clearDoctors();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      {/* <li>
        <Link to='/register'>Register Admin</Link>
      </li> */}
      <li>
        <Link to='/login'>Login Admin</Link>
      </li>
      <li>
        <Link to='/registerPatient'>Register Patient</Link>
      </li>

      <li>
        <Link to='/loginPatient'>Login Patient</Link>
      </li>
      {/* <li>
        <Link to='/registerDoctor'>Register Doctor</Link>
      </li> */}

      <li>
        <Link to='/loginDoctor'>Login Doctor</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        <Link to='/'>
          <i className={icon} /> {title}
        </Link>
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'Medicus Angelus',
  icon: 'fas fa-notes-medical'
};

export default Navbar;
