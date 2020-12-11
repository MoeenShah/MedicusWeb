import {
    GET_APPOINTMENTS,
    GET_APPOINTMENTS_WEB,
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
  
  export default (state, action) => {
    switch (action.type) {
      case GET_APPOINTMENTS:
        return {
          ...state,
          appointments: action.payload,
          loading: false
        };
        case GET_APPOINTMENTS_WEB:
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
          filteredappointment: null,
          errorappointment: null,
          currentappointment: null
        };
      case SET_CURRENT_APPOINTMENT:
        return {
          ...state,
          currentappointment: action.payload
        };
      case CLEAR_CURRENT_APPOINTMENT:
        return {
          ...state,
          currentappointment: null
        };
      case FILTER_APPOINTMENTS:
        return {
          ...state,
          filteredappointment: state.appointments.filter(appointment => {
            const regex = new RegExp(`${action.payload}`, 'gi');
            return appointment.detail.match(regex);
          })
        };
      case CLEAR_FILTER_APPOINTMENTS:
        return {
          ...state,
          filteredappointment: null
        };
      case APPOINTMENT_ERROR:
        return {
          ...state,
          errorappointment: action.payload
        };
      default:
        return state;
    }
  };
  