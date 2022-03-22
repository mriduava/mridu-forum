import React from 'react';
import bgimage from '../images/waves.png'

export const Jumbotron = (props) => {
  return (
    <div className="jumbotron mb-2 text-center" 
      style={{ backgroundImage: `url(${bgimage})`, backgroundSize: 'cover' }}>
      <p className="home-text">Storms don't <br/> last forever</p>
    </div>
  );
};

export default Jumbotron;
