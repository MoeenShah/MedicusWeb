import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AppointmentItem from './AppointmentItem';
import Spinner from '../layout/Spinner';
import DoctorContext from '../../context/doctor/doctorContext';
import AppointmentContext from '../../context/appointment/appointmentContext';

const Appointment = () => {
  const doctorContext = useContext(DoctorContext);
  const appointmentContext = useContext(AppointmentContext);
  const { getAppointments, filteredappointment, appointments,loading } = appointmentContext;

  // const { doctors, filteredappointment, getDoctors, loading } = doctorContext;

  useEffect(() => {
    getAppointments();
    // eslint-disable-next-line
  }, []);

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
