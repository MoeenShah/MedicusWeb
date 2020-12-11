import React, { useContext, useRef, useEffect } from 'react';
import AppointmentContext from '../../context/appointment/appointmentContext';

const AppointmentFilter = () => {
  const appointmentContext = useContext(AppointmentContext);
  const text1 = useRef('');

  const { filterAppointments, clearFilterAppointments, filteredAppointments } = appointmentContext;

  useEffect(() => {
    if (filteredAppointments === null) {
      text1.current.value = '';
    }
  });

  const onChangeAppointment = e1 => {
    if (text1.current.value !== '') {
      filterAppointments(e1.target.value);
    } else {
      clearFilterAppointments();
    }
  };

  return (
    <form>
      <input
        ref={text1}
        type='text'
        placeholder='Filter Appointments Here'
        onChange={onChangeAppointment}
      />
    </form>
  );
};

export default AppointmentFilter;
