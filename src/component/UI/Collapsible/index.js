import React, { useState } from 'react';
import './Collapsible.scss';

const Collapsible = (props) => {
  const [open, setOpen] = useState(false);

  const togglePanel = (e) => {
    setOpen(!open);
  };

  return (
    <div>
      <div onClick={togglePanel} className='collapsible_header'>
        {props.title}
      </div>
      {open ? (
        <div className='contentBox open'>
          {' '}
          <div className='content'>{props.children}</div>
        </div>
      ) : null}
    </div>
  );
};

export default Collapsible;
