import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AppointmentItem from './AppointmentItem';
import Spinner from '../layout/Spinner';
import PatientContext from '../../context/patient/patientContext';
import AppointmentContext from '../../context/appointment/appointmentContext';

const Appointment = () => {
  const patientContext = useContext(PatientContext);
  const appointmentContext = useContext(AppointmentContext);
  const { getAppointmentsweb, filteredappointment, appointments,loading } = appointmentContext;

  // const { patients, getPatients} = patientContext;

  useEffect(() => {
    getAppointmentsweb();
    // getPatients();
    
    // eslint-disable-next-line
  }, []);
  // console.log(patients);

  if (appointments !== null && appointments.length === 0 && !loading ) {
    return <h4>Add an appointment</h4>;
  }

  return (
    <Fragment>
      {appointments !== null && !loading ? (
        <TransitionGroup>
          {filteredappointment !== null
            ? filteredappointment.map(appointment => (
                <CSSTransition
                  key={appointment._id}
                  timeout={500}
                  classNames='item'
                >
                  <AppointmentItem appointment={appointment} />
                </CSSTransition>
              ))
            : appointments.map(appointment => (
                <CSSTransition
                  key={appointment._id}
                  timeout={500}
                  classNames='item'
                >
                  <AppointmentItem appointment={appointment} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Appointment;
