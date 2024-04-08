import React from 'react';

import '../styles/TimelineEditModal.css';
import closeSymbol from '../assets/closeSymbol.svg';

const TimelineEditModal = ({ handleToggle, state }) => {

  return (
    <div className="timeline-edit-modal">
      <button onClick={() => { handleToggle() }}>
        <img src={closeSymbol} alt="close symbol" />
      </button>
    </div>
  )
};

export default TimelineEditModal;