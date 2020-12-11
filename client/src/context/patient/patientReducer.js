import {
    GET_PATIENTS,
    ADD_PATIENT,
    DELETE_PATIENT,
    SET_CURRENT_PATIENT,
    CLEAR_CURRENT_PATIENT,
    UPDATE_PATIENT,
    FILTER_PATIENTS,
    CLEAR_FILTER_PATIENTS,
    PATIENT_ERROR,
    CLEAR_PATIENTS
  } from '../types';
  
  export default (state, action) => {
    switch (action.type) {
      case GET_PATIENTS:
        return {
          ...state,
          patients: action.payload,
          loading: false
        };
      case ADD_PATIENT:
        return {
          ...state,
          patients: [action.payload, ...state.patients],
          loading: false
        };
      case UPDATE_PATIENT:
        return {
          ...state,
          patients: state.patients.map(patient =>
            patient._id === action.payload._id ? action.payload : patient
          ),
          loading: false
        };
      case DELETE_PATIENT:
        return {
          ...state,
          patients: state.patients.filter(
            patient => patient._id !== action.payload
          ),
          loading: false
        };
      case CLEAR_PATIENTS:
        return {
          ...state,
          patients: null,
          filtered: null,
          error: null,
          current: null
        };
      case SET_CURRENT_PATIENT:
        return {
          ...state,
          current: action.payload
        };
      case CLEAR_CURRENT_PATIENT:
        return {
          ...state,
          current: null
        };
      case FILTER_PATIENTS:
        return {
          ...state,
          filtered: state.patients.filter(patient => {
            const regex = new RegExp(`${action.payload}`, 'gi');
            return patient.name.match(regex);
          })
        };
      case CLEAR_FILTER_PATIENTS:
        return {
          ...state,
          filtered: null
        };
      case PATIENT_ERROR:
        return {
          ...state,
          error: action.payload
        };
      default:
        return state;
    }
  };
  