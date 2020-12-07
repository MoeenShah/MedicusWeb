import React, { useReducer } from 'react';
import axios from 'axios';
import AppointmentContext from './appointmentContext';
import appointmentReducer from './appointmentReducer';
import {
  GET_APPOINTMENTS,
  ADD_APPOINTMENT,
  DELETE_APPOINTMENT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_APPOINTMENT,
  FILTER_APPOINTMENTS,
  CLEAR_FILTER,
  APPOINTMENT_ERROR,
  CLEAR_APPOINTMENTS,
} from '../types';

const AppointmentState = props => {
  const initialState = {
    appointments: [],
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(appointmentReducer, initialState);

  // Get Appointments
  const getAppointments = async () => {
    try {
      const res = await axios.get('/api/appointments');

      dispatch({
        type: GET_APPOINTMENTS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: APPOINTMENT_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Appointment
  const addAppointment = async appointment => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/appointments', appointment, config);

      dispatch({
        type: ADD_APPOINTMENT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: APPOINTMENT_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Appointment
  const deleteAppointment = async id => {
    try {
      await axios.delete(`/api/appointments/${id}`);

      dispatch({
        type: DELETE_APPOINTMENT,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: APPOINTMENT_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update Appointment
  const updateAppointment = async appointment => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/api/appointments/${appointment._id}`,
        appointment,
        config
      );

      dispatch({
        type: UPDATE_APPOINTMENT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: APPOINTMENT_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Clear Appointments
  const clearAppointments = () => {
    dispatch({ type: CLEAR_APPOINTMENTS });
  };

  // Set Current Appointment
  const setCurrentAppointment = appointment => {
    dispatch({ type: SET_CURRENT, payload: appointment });
  };

  // Clear Current Appointment
  const clearCurrentAppointment = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Appointments
  const filterAppointments = text => {
    dispatch({ type: FILTER_APPOINTMENTS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments: state.appointments,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addAppointment,
        deleteAppointment,
        setCurrentAppointment,
        clearCurrentAppointment,
        updateAppointment,
        filterAppointments,
        clearFilter,
        getAppointments,
        clearAppointments
      }}
    >
      {props.children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentState;
