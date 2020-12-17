import React from 'react';

const DoctorApply = () => {
  return (
    <div>
    <div>
      <h1>Thank you for choosing Medicus Angelus!</h1>
      <p className='my-1'>
        We will get back to you soon! | moeenshah54@gmail.com
      </p>
      <p className='bg-dark p'>
        <strong>Version: </strong> 0.9.9
      </p>
    </div>
    <form>
      <h2 className='text-primary'>
        {/* {current ? 'Edit Angelus' : 'Add Angelus'} */}
      </h2>
      <input
        type='text'
        placeholder='Name'
        // name='name'
        // value={name}
        // onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        // name='email'
        // value={email}
        // // onChange={onChange}
      />
            {/* <input
        type='password'
        placeholder='Password'
        // name='password'
        // value={password}
        // // onChange={onChange}
      /> */}
            <input
        type='text'
        placeholder='Qualification'
        // name='qualification'
        // value={qualification}
        // onChange={onChange}
      />
      <input
        type='text'
        placeholder='PMC REGISTRATION NUMBER'
        // name='pmc'
        // value={pmc}
        // onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        // name='phone'
        // value={phone}
        // // onChange={onChange}
      />
      <input
        type='text'
        placeholder='Domain'
        // name='domain'
        // value={domain}
        // // onChange={onChange}
      />
      <h5>Doctor Type</h5>
      <input
        type='radio'
        // name='type'
        // value='silver'
        // checked={type === 'silver'}
        // // onChange={onChange}
      />{' '}
      Silver{' '}
      <input
        type='radio'
        // name='type'
        // value='gold'
        // checked={type === 'gold'}
        // // onChange={onChange}
      />{' '}
      Gold
      <div>
        <input
          type='submit'
          // value={current ? 'Update Doctor' : 'Add Doctor'}
          className='btn btn-primary btn-block'
        />
      </div>
      {/* {current && (
        <div>
          <button className='btn btn-light btn-block'>
            Clear
          </button>
        </div>
      )} */}
    </form>
    </div>
  );
};

export default DoctorApply;
