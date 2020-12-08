import React from 'react';
import Doctors from '../doctorsPatient/Doctors';
import DoctorForm from '../doctorsPatient/DoctorForm';
import DoctorFilter from '../doctors/DoctorFilter';
import Appointments from '../doctorsPatient/Appointments';
import AppointmentFilter from '../doctorsPatient/DoctorFilter';

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
        <AppointmentFilter />
        <Appointments />
      </div>
    </div>
  );
};

export default HomePatient;
