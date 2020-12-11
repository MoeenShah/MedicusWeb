import React, { useState, useContext, useEffect } from 'react';
import DoctorContext from '../../context/doctor/doctorContext';
import AppointmentContext from '../../context/appointment/appointmentContext';
import AuthContext from '../../context/auth/authContext';

const DoctorForm = () => {
  const doctorContext = useContext(DoctorContext);
  const authContext = useContext(AuthContext);
  const appointmentContext = useContext(AppointmentContext);

  const { addDoctor, updateDoctor, clearCurrent, current } = doctorContext;
  // const { addAppointment, updateAppointment, clearCurrent, current } = appointmentContext;
  const { addAppointment, updateAppointment, clearCurrentAppointment, currentAppointment } = appointmentContext;
  const { isAuthenticated, logout, user, loadUser } = authContext;

  const [appointment, setAppointment] = useState({
    doctor: current?._d,
    detail: '',

  });

  useEffect(() => {
    if (current !== null) {
      setAppointment({...appointment,doctor:current?._id});
    } else {
      setAppointment({
        detail: '',
      });
    }
  }, [appointmentContext, current]);


  const { detail } = appointment;
  const name = current?.name;

  const onChange = e =>{
    // setAppointment([{ ...current.name, [e.target.name]: e.target.value },{detail: detail}]);
    setAppointment({...appointment,detail:e.target.value})
  }

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      updateAppointment(appointment);
    } else {
      addAppointment(appointment);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Appoint Angelus' : 'Select an Angelus'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        disabled
        // onChange={onChange}
      />
      {/* <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      /> */}
            {/* <input
        type='password'
        placeholder='Password'
        name='password'
        value={password}
        onChange={onChange}
      /> */}
      {/* <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChange}
      /> */}
      <input
        type='text'
        placeholder='Detail'
        name='detail'
        value={detail}
        onChange={onChange}
      />
      {/* <h5>Doctor Type</h5>
      <input
        type='radio'
        name='type'
        value='silver'
        checked={type === 'silver'}
        onChange={onChange}
      />{' '}
      Silver{' '}
      <input
        type='radio'
        name='type'
        value='gold'
        checked={type === 'gold'}
        onChange={onChange}
      />{' '} */}
      {/* Gold */}
      <div>
        <input
          type='submit'
          value={current ? 'Appoint Angelus' : 'Select an Angelus'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default DoctorForm;
