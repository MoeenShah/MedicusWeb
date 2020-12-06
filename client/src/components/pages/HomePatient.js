import React from 'react';
import Doctors from '../doctorsPatient/Doctors';
import DoctorForm from '../doctorsPatient/DoctorForm';
import DoctorFilter from '../doctorsPatient/DoctorFilter';

const HomePatient = () => {
  return (
    <div className='grid-2'>
      <div>
        <DoctorForm />
      </div>
      <div>
      <h2 className='text-primary'>Angelus</h2>
        <DoctorFilter />
        <Doctors />
      </div>
    </div>
  );
};

export default HomePatient;
