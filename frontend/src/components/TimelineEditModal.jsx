import React from 'react';

import '../styles/TimelineEditModal.css';
import closeSymbol from '../assets/closeSymbol.svg';

const TimelineEditModal = ({ setDisplayModal, state }) => {

  return (
    <div className="timeline-edit-modal">
      <button onClick={() => { setDisplayModal() }}>
        <img src={closeSymbol} alt="close symbol" />
      </button>
    </div>
  )
};

export default TimelineEditModal;
