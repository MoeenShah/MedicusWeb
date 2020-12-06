import React from 'react';
import Doctors from '../doctors/Doctors';
import DoctorForm from '../doctors/DoctorForm';
import DoctorFilter from '../doctors/DoctorFilter';

const Home = () => {
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

export default Home;
