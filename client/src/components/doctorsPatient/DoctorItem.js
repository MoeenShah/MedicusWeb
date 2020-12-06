import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import DoctorContext from '../../context/doctor/doctorContext';

const DoctorItem = ({ doctor }) => {
  const doctorContext = useContext(DoctorContext);
  const { deleteDoctor, setCurrent, clearCurrent } = doctorContext;

  const { _id, name, email, phone, domain, type } = doctor;

  // const onDelete = () => {
  //   deleteDoctor(_id);
  //   clearCurrent();
  // };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'silver' ? 'badge-silver' : 'badge-gold')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open' /> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone' /> {phone}
          </li>
        )}
        {domain && (
          <li>
            <i className='fas fa-tree' /> {domain}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(doctor)}
        >
          Appoint
        </button>
        {/* <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button> */}
      </p>
    </div>
  );
};

DoctorItem.propTypes = {
  doctor: PropTypes.object.isRequired
};

export default DoctorItem;
