import React from 'react';
import Doctors from '../doctorsPatient/Doctors';
import DoctorForm from '../doctorsPatient/DoctorForm';
import DoctorFilter from '../doctorsPatient/DoctorFilter';
import Appointments from '../doctorsPatient/Appointments';

const HomePatient = () => {
  return (
    <div className='grid-3'>
      <div>
        <DoctorForm />
      </div>
      <div>
      <h2 className='text-primary'>Angelus</h2>
        <DoctorFilter />
        <Doctors />
      </div>
      <div>
      <h2 className='text-primary'>Appointments</h2>
        <DoctorFilter />
        <Appointments />
      </div>
    </div>
  );
};

export default HomePatient;
