import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import DoctorContext from "../../context/doctor/doctorContext";
import AppointmentContext from "../../context/appointment/appointmentContext";

const AppointmentItem = ({ appointment }) => {
  const doctorContext = useContext(DoctorContext);
  const appointmentContext = useContext(AppointmentContext);

  const { deleteDoctor, setCurrent, clearCurrent, doctors } = doctorContext;
  const { deleteAppointment, setCurrentAppointment, clearCurrentAppointment, appointments } = appointmentContext;

  const { _id, doctor, detail, date } = appointment;

  const [doc, setDoc] = useState(null)

  useEffect(() => {
    const doct = doctors.filter((val) => val._id === doctor);
    setDoc(doct[0])
    return () => {};
  }, [doctor]);

  const onDelete = () => {
    deleteAppointment(_id);
    clearCurrent();
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
      <h3 className="text-primary text-left">{doc?.name}</h3>
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
          // onClick={() => setCurrent(doctor)}
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
  doctor: PropTypes.object.isRequired,
};

export default AppointmentItem;
