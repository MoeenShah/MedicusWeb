import {
    GET_DOCTORS,
    ADD_DOCTOR,
    DELETE_DOCTOR,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_DOCTOR,
    FILTER_DOCTORS,
    CLEAR_FILTER,
    DOCTOR_ERROR,
    CLEAR_DOCTORS
  } from '../types';
  
  export default (state, action) => {
    switch (action.type) {
      case GET_DOCTORS:
        return {
          ...state,
          doctors: action.payload,
          loading: false
        };
      case ADD_DOCTOR:
        return {
          ...state,
          doctors: [action.payload, ...state.doctors],
          loading: false
        };
      case UPDATE_DOCTOR:
        return {
          ...state,
          doctors: state.doctors.map(doctor =>
            doctor._id === action.payload._id ? action.payload : doctor
          ),
          loading: false
        };
      case DELETE_DOCTOR:
        return {
          ...state,
          doctors: state.doctors.filter(
            doctor => doctor._id !== action.payload
          ),
          loading: false
        };
      case CLEAR_DOCTORS:
        return {
          ...state,
          doctors: null,
          filtered: null,
          error: null,
          current: null
        };
      case SET_CURRENT:
        return {
          ...state,
          current: action.payload
        };
      case CLEAR_CURRENT:
        return {
          ...state,
          current: null
        };
      case FILTER_DOCTORS:
        return {
          ...state,
          filtered: state.doctors.filter(doctor => {
            const regex = new RegExp(`${action.payload}`, 'gi');
            return doctor.name.match(regex) || doctor.domain.match(regex);
          })
        };
      case CLEAR_FILTER:
        return {
          ...state,
          filtered: null
        };
      case DOCTOR_ERROR:
        return {
          ...state,
          error: action.payload
        };
      default:
        return state;
    }
  };
  