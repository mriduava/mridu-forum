import React from 'react';
import bgimage from '../images/mriduava.jpg'

const Jumbotron = (props) => {
  return (
    <div className="jumbotron mb-2 px-3 text-center" 
      style={{ backgroundImage: `url(${bgimage})`, backgroundSize: 'cover' }}>
      <h1 className="ml-0 px-0 text-white font-weight-bold">MRIDU FORUM</h1>
      <p className="text-light">An online discussion site</p>
    </div>
  );
};

export default Jumbotron;
