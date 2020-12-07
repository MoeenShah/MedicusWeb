import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import DoctorContext from "../../context/doctor/doctorContext";

const DoctorItem = ({ appointment }) => {
  const doctorContext = useContext(DoctorContext);

  const { deleteDoctor, setCurrent, clearCurrent, doctors } = doctorContext;

  const { _id, doctor, detail } = appointment;

  const [doc, setDoc] = useState(null)

  useEffect(() => {
    const doct = doctors.filter((val) => val._id === doctor);
    setDoc(doct[0])
    return () => {};
  }, [doctor]);

  // const onDelete = () => {
  //   deleteDoctor(_id);
  //   clearCurrent();
  // };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">{doc?.name}</h3>
      <p>{detail}</p>
      {/* <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open' /> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone' /> {phone}
          </li>
        )}
        {domain && (
          <li>
            <i className='fas fa-tree' /> {domain}
          </li>
        )}
      </ul> */}
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(doctor)}
        >
          Start
        </button>
        {/* <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button> */}
      </p>
    </div>
  );
};

DoctorItem.propTypes = {
  doctor: PropTypes.object.isRequired,
};

export default DoctorItem;
