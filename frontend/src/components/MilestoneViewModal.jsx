import React from 'react';
//import { useHistory } from 'react-router-dom';

import '../styles/MilestoneViewModal.css';
import closeSymbol from '../assets/closeSymbol.svg';

const MilestoneViewModal = (props) => {
  const { state, handleMilestoneClicked } = props;
  console.log("state.selectedMilestone::",state.selectedMilestone);
  const isoDate = new Date(state.selectedMilestone.milestone_date).toISOString();
  const formattedDate = isoDate.substring(0, 10); // Extracting YYYY-MM-DD
  
  return (
    <div className='milestone-view-modal'> 
      <button className="close-button" onClick={() => { handleMilestoneClicked() }}>
        <img src={closeSymbol} alt='close symbol' />
      </button>
      <div className='card-body'>
        <p className='card-title'>{state.selectedMilestone.milestone_title}</p>
        <p className='card-text'>Date: {formattedDate}</p>
        <p className='card-title'>Diary Entry: {state.selectedMilestone.diary_entry}</p>
        Photos:  <img src={`/uploads/${state.selectedMilestone.image1}`} alt='image1' />
        <img src={`/uploads/${state.selectedMilestone.image2}`} alt='image2' />
        <img src={`/uploads/${state.selectedMilestone.image3}`} alt='image3' />
        <img src={`/uploads/${state.selectedMilestone.image4}`} alt='image4' />
      </div>
    </div>
  );
};

export default MilestoneViewModal;

// import React from 'react';
// import { useHistory } from 'react-router-dom';

// const GoBackButton = () => {
//   const history = useHistory();

//   const goBack = () => {
//     history.goBack();
//   };

//   return (
//     <button onClick={goBack}>Go Back</button>
//   );
// };

// export default GoBackButton;