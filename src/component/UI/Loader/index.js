import React from 'react';
import './Loader.scss';

const Loader = ({ color = 'rgba(0, 0, 0, 1)' }) => {
  return (
    <div className='spinner'>
      <div className='bounce1' style={{ backgroundColor: color }}></div>
      <div className='bounce2' style={{ backgroundColor: color }}></div>
      <div className='bounce3' style={{ backgroundColor: color }}></div>
    </div>
  );
};

export default Loader;
