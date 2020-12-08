import React, { useReducer } from 'react';
import axios from 'axios';
import AppointmentContext from './appointmentContext';
import appointmentReducer from './appointmentReducer';
import {
  GET_APPOINTMENTS,
  ADD_APPOINTMENT,
  DELETE_APPOINTMENT,
  SET_CURRENT_APPOINTMENT,
  CLEAR_CURRENT_APPOINTMENT,
  UPDATE_APPOINTMENT,
  FILTER_APPOINTMENTS,
  CLEAR_FILTER_APPOINTMENTS,
  APPOINTMENT_ERROR,
  CLEAR_APPOINTMENTS,
} from '../types';

const AppointmentState = props => {
  const initialState = {
    appointments: [],
    currentappointment: null,
    filteredappointment: null,
    errorappointment: null
  };

  const [state, dispatch] = useReducer(appointmentReducer, initialState);

  // Get Appointments
  const getAppointments = async () => {
    try {
      const res = await axios.get('/api/appointments/web');

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
    dispatch({ type: SET_CURRENT_APPOINTMENT, payload: appointment });
  };

  // Clear Current Appointment
  const clearCurrentAppointment = () => {
    dispatch({ type: CLEAR_CURRENT_APPOINTMENT });
  };

  // Filter Appointments
  const filterAppointments = text => {
    dispatch({ type: FILTER_APPOINTMENTS, payload: text });
  };

  // Clear Filter
  const clearFilterAppointments = () => {
    dispatch({ type: CLEAR_FILTER_APPOINTMENTS });
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments: state.appointments,
        currentappointment: state.currentappointment,
        filteredappointment: state.filteredappointment,
        errorappointment: state.errorappointment,
        addAppointment,
        deleteAppointment,
        setCurrentAppointment,
        clearCurrentAppointment,
        updateAppointment,
        filterAppointments,
        clearFilterAppointments,
        getAppointments,
        clearAppointments
      }}
    >
      {props.children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentState;
