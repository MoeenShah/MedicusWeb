import React, { useReducer } from 'react';
import axios from 'axios';
import PatientContext from './patientContext';
import patientReducer from './patientReducer';
import {
  GET_PATIENTS,
  ADD_PATIENT,
  DELETE_PATIENT,
  SET_CURRENT_PATIENT,
  CLEAR_CURRENT_PATIENT,
  UPDATE_PATIENT,
  FILTER_PATIENTS,
  CLEAR_PATIENTS,
  CLEAR_FILTER_PATIENTS,
  PATIENT_ERROR
} from '../types';

const PatientState = props => {
  const initialState = {
    patients: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(patientReducer, initialState);

  // Get Patients
  const getPatients = async () => {
    try {
      const res = await axios.get('/api/patients');

      dispatch({
        type: GET_PATIENTS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PATIENT_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Patient
  const addPatient = async patient => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/patients', patient, config);

      dispatch({
        type: ADD_PATIENT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PATIENT_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Patient
  const deletePatient = async id => {
    try {
      await axios.delete(`/api/patients/${id}`);

      dispatch({
        type: DELETE_PATIENT,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: PATIENT_ERROR,
        payload: err.response.msg
      });
    } 
  };

  // Update Patient
  const updatePatient = async patient => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/api/patients/${patient._id}`,
        patient,
        config
      );

      dispatch({
        type: UPDATE_PATIENT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PATIENT_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Clear Patients
  const clearPatients = () => {
    dispatch({ type: CLEAR_PATIENTS });
  };

  // Set Current Patient
  const setCurrentpatient = patient => {
    dispatch({ type: SET_CURRENT_PATIENT, payload: patient });
  };

  // Clear Current Doctor
  const clearCurrentpatient = () => {
    dispatch({ type: CLEAR_CURRENT_PATIENT });
  };

  // Filter Appointments
  const filterPatients = text => {
    dispatch({ type: FILTER_PATIENTS, payload: text });
  };

  // Clear Filter
  const clearFilterpatients = () => {
    dispatch({ type: CLEAR_FILTER_PATIENTS });
  };

  return (
    <PatientContext.Provider
      value={{
        patients: state.patients,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addPatient,
        deletePatient,
        setCurrentpatient,
        clearCurrentpatient,
        updatePatient,
        filterPatients,
        clearFilterpatients,
        getPatients,
        clearPatients
      }}
    >
      {props.children}
    </PatientContext.Provider>
  );
};

export default PatientState;
