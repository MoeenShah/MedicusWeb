import React, { useState, useContext, useEffect } from 'react';
import DoctorContext from '../../context/doctor/doctorContext';

const DoctorForm = () => {
  const doctorContext = useContext(DoctorContext);

  const { addDoctor, updateDoctor, clearCurrent, current } = doctorContext;

  useEffect(() => {
    if (current !== null) {
      setDoctor(current);
    } else {
      setDoctor({
        name: '',
        email: '',
        phone: '',
        password: '',
        type: 'silver',
        domain: ''
      });
    }
  }, [doctorContext, current]);

  const [doctor, setDoctor] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    type: 'silver',
    domain: ''
  });

  const { name, email, password, phone, type, domain } = doctor;

  const onChange = e =>
    setDoctor({ ...doctor, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addDoctor(doctor);
    } else {
      updateDoctor(doctor);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Angelus' : 'Add Angelus'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
            <input
        type='password'
        placeholder='Password'
        name='password'
        value={password}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Domain'
        name='domain'
        value={domain}
        onChange={onChange}
      />
      <h5>Doctor Type</h5>
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
      />{' '}
      Gold
      <div>
        <input
          type='submit'
          value={current ? 'Update Doctor' : 'Add Doctor'}
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
