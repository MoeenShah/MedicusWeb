import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PatientItem from './PatientItem';
import Spinner from '../layout/Spinner';
import PatientContext from '../../context/patient/patientContext';

const Patients = () => {
  const patientContext = useContext(PatientContext);

  const { patients, filteredpatients, getPatients, loading } = patientContext;
  

  useEffect(() => {
    getPatients();
    // eslint-disable-next-line
  }, []);

  if (patients !== null && patients.length === 0 && !loading) {
    return <h4>Add a Patient</h4>;
  }

  return (
    <Fragment>
      {patients !== null && !loading ? (
        <TransitionGroup>
          {filteredpatients !== null
            ? filteredpatients.map(patient => (
                <CSSTransition
                  key={patient._id}
                  timeout={500}
                  classNames='item'
                >
                  <PatientItem patient={patient} />
                </CSSTransition>
              ))
            : patients.map(patient => (
                <CSSTransition
                  key={patient._id}
                  timeout={500}
                  classNames='item'
                >
                  <PatientItem patient={patient} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Patients;
