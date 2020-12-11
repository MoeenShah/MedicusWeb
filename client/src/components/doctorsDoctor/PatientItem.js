import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PatientContext from '../../context/patient/patientContext';

const PatientItem = ({ patient }) => {
  const patientContext = useContext(PatientContext);
  const { deletePatient, setCurrentpatient, clearCurrentpatient } = patientContext;

  const { _id, name, email} = patient;

  const onDelete = () => {
    deletePatient(_id);
    clearCurrentpatient();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        {/* <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'silver' ? 'badge-silver' : 'badge-gold')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span> */}
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open' /> {email}
          </li>
        )}
        {/* {phone && (
          <li>
            <i className='fas fa-phone' /> {phone}
          </li>
        )}
        {domain && (
          <li>
            <i className='fas fa-tree' /> {domain}
          </li>
        )} */}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrentpatient(patient)}
        >
          Appoint
        </button>
        { <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
}
       </p> 
    </div>
  );
};

PatientItem.propTypes = {
  patient: PropTypes.object.isRequired
};

export default PatientItem;
