import React, { useContext, useRef, useEffect } from 'react';
import DoctorContext from '../../context/doctor/doctorContext';

const DoctorFilter = () => {
  const doctorContext = useContext(DoctorContext);
  const text = useRef('');

  const { filterDoctors, clearFilter, filtered } = doctorContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      filterDoctors(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Doctors Here'
        onChange={onChange}
      />
    </form>
  );
};

export default DoctorFilter;
