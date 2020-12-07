import React, { useReducer } from 'react';
import axios from 'axios';
import DoctorContext from './doctorContext';
import doctorReducer from './doctorReducer';
import {
  GET_DOCTORS,
  ADD_DOCTOR,
  DELETE_DOCTOR,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_DOCTOR,
  FILTER_DOCTORS,
  CLEAR_DOCTORS,
  CLEAR_FILTER,
  DOCTOR_ERROR
} from '../types';

const DoctorState = props => {
  const initialState = {
    doctors: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(doctorReducer, initialState);

  // Get Doctors
  const getDoctors = async () => {
    try {
      const res = await axios.get('/api/doctors');

      dispatch({
        type: GET_DOCTORS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: DOCTOR_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Doctor
  const addDoctor = async doctor => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/doctors', doctor, config);

      dispatch({
        type: ADD_DOCTOR,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: DOCTOR_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Doctor
  const deleteDoctor = async id => {
    try {
      await axios.delete(`/api/doctors/${id}`);

      dispatch({
        type: DELETE_DOCTOR,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: DOCTOR_ERROR,
        payload: err.response.msg
      });
    } 
  };

  // Update Doctor
  const updateDoctor = async doctor => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/api/doctors/${doctor._id}`,
        doctor,
        config
      );

      dispatch({
        type: UPDATE_DOCTOR,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: DOCTOR_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Clear Doctors
  const clearDoctors = () => {
    dispatch({ type: CLEAR_DOCTORS });
  };

  // Set Current Doctor
  const setCurrent = doctor => {
    dispatch({ type: SET_CURRENT, payload: doctor });
  };

  // Clear Current Doctor
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Doctors
  const filterDoctors = text => {
    dispatch({ type: FILTER_DOCTORS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <DoctorContext.Provider
      value={{
        doctors: state.doctors,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addDoctor,
        deleteDoctor,
        setCurrent,
        clearCurrent,
        updateDoctor,
        filterDoctors,
        clearFilter,
        getDoctors,
        clearDoctors
      }}
    >
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorState;
