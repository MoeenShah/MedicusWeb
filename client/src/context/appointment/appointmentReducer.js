import {
    GET_APPOINTMENTS,
    ADD_APPOINTMENT,
    DELETE_APPOINTMENT,
    SET_CURRENT_APP,
    CLEAR_CURRENT_APP,
    UPDATE_APPOINTMENT,
    FILTER_APPOINTMENTS,
    CLEAR_FILTER_APP,
    APPOINTMENT_ERROR,
    CLEAR_APPOINTMENTS
  } from '../types';
  
  export default (state, action) => {
    switch (action.type) {
      case GET_APPOINTMENTS:
        return {
          ...state,
          appointments: action.payload,
          loading: false
        };
      case ADD_APPOINTMENT:
        return {
          ...state,
          appointments: [action.payload, ...state.appointments],
          loading: false
        };
      case UPDATE_APPOINTMENT:
        return {
          ...state,
          appointments: state.appointments.map(appointment =>
            appointment._id === action.payload._id ? action.payload : appointment
          ),
          loading: false
        };
      case DELETE_APPOINTMENT:
        return {
          ...state,
          appointments: state.appointments.filter(
            appointment => appointment._id !== action.payload
          ),
          loading: false
        };
      case CLEAR_APPOINTMENTS:
        return {
          ...state,
          appointments: null,
          filtered: null,
          error: null,
          current: null
        };
      case SET_CURRENT_APP:
        return {
          ...state,
          current: action.payload
        };
      case CLEAR_CURRENT_APP:
        return {
          ...state,
          current: null
        };
      case FILTER_APPOINTMENTS:
        return {
          ...state,
          filtered: state.appointments.filter(appointment => {
            const regex = new RegExp(`${action.payload}`, 'gi');
            return appointment.name.match(regex) || appointment.domain.match(regex);
          })
        };
      case CLEAR_FILTER_APP:
        return {
          ...state,
          filtered: null
        };
      case APPOINTMENT_ERROR:
        return {
          ...state,
          error: action.payload
        };
      default:
        return state;
    }
  };
  