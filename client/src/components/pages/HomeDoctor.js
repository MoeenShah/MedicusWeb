import React from 'react';
import Patients from '../doctorsDoctor/Patients';
import DoctorForm from '../doctorsPatient/DoctorForm';
import DoctorFilter from '../doctors/DoctorFilter';
import Appointments from '../doctorsDoctor/Appointments';
// import AppointmentFilter from '../doctorsDoctor/DoctorFilter';

const HomeDoctor = () => {
  return (
    <div className='grid-2'>
      {/* <div>
        <DoctorForm />
      </div> */}
      <div>
      {/* <h2 className='text-primary'>Angelus</h2> */}
        {/* <DoctorFilter /> */}
        <Patients />
      </div>
      <div>
      <h2 className='text-primary'>Appointments</h2>
        {/* <AppointmentFilter /> */}
        <Appointments />
      </div>
    </div>
  );
};

export default HomeDoctor;
