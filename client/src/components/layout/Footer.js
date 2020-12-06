import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

const Footer = () => {

  const guestLinks = (
    <Fragment>
      <li>
        <Link to=''> <i className='fab fa-facebook-f'/> Facebook</Link>
      </li>
      <li>
        <Link to=''> <i className='fab fa-twitter'/> Twitter</Link>
      </li>
      <li>
        <Link to='/support'> <i className='fa fa-question-circle'/> Support</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='footer bg-primary'>
      <h3>"Because time is money and health is wealth"</h3>
      
      <ul>{guestLinks}</ul>
    
    
    </div>
  );
};

export default Footer;
