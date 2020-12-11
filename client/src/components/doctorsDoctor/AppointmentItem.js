import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import PatientContext from "../../context/patient/patientContext";
import AppointmentContext from "../../context/appointment/appointmentContext";

const AppointmentItem = ({ appointment }) => {
  const patientContext = useContext(PatientContext);
  const appointmentContext = useContext(AppointmentContext);

  const { patients, clearCurrentpatient, getPatients} = patientContext;
  const { deleteAppointment, setCurrentAppointment, clearCurrentAppointment, appointments } = appointmentContext;

  const { _id, patient, detail, date } = appointment;

  const [pat, setPat] = useState(null)
  console.log(appointment);
  
  console.log(patients);

  useEffect(() => {

    const pati = patients.filter((val) => val._id === patient);
    setPat(pati[0])
    return () => {};
  }, [patient]);

  const onDelete = () => {
    deleteAppointment(_id);
    clearCurrentpatient();
  };

  const URL = "https://moeenvideo.herokuapp.com/b4af6a80-8d7f-4bbe-8ea1-df3fae0f83dc";

  const open = (URL) => {
    const win = window.open(URL, '_blank');
    if (win != null) {
      win.focus();
    }
  }

  const datestring = (date) =>{
    // const tempdate =  date.toString();
    // return tempdate.toTimeSring();
    return Date(date);

  }

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">{pat?.name}</h3>
      {/* <p>{detail}</p> */}
      {/* <p>{}</p> */}
      <ul className='list'>
        {datestring(date) && (
          <li>
            <i className='fas fa-clock' /> {datestring(date)}
          </li>
        )}
        { detail && (
          <li>
            <i className='fas fa-info-circle' /> {detail}
          </li>
        )}
        {/* // {domain && ( */}
        {/* //   <li>
        //     <i className='fas fa-tree' /> {domain}
        //   </li> }
        )} */}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          // onClick={() => setCurrent(patient)}
          onClick={() => open(URL)}
        >
          Start
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Cancel
        </button>
      </p>
    </div>
  );
};

AppointmentItem.propTypes = {
  patient: PropTypes.object.isRequired,
};

export default AppointmentItem;
