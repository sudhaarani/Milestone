import React, { useState, useEffect } from 'react';
//import { useHistory } from 'react-router-dom';
import '../styles/MilestoneViewModal.css';
import FullImageModal from "./FullImageModal.jsx";
import useToggle from "../hooks/useToggle";



const MilestoneViewModal = ({ state, milestoneToggle }) => {
  const [fullImage, setFullImage] = useState(null);
  const imageModalToggle = useToggle();
  const handleFullImageModal = (imageUrl) => {
    setFullImage(imageUrl);
    imageModalToggle.handleToggle();
  };

  console.log("state.selectedMilestone: ", state.selectedMilestone);
  const isoDate = new Date(state.selectedMilestone.milestone_date).toISOString();
  const formattedDate = isoDate.substring(0, 10); // Extracting YYYY-MM-DD


  return (
    <div className='milestone-view-modal'>
      <i className="fa-solid fa-arrow-left" onClick={() => { milestoneToggle.handleToggle() }} />
      <div className='card-body'>
        <h3 className='card-title'>{state.selectedMilestone.milestone_title}</h3>
        <p className='card-text'>{formattedDate}</p>
        <div className="diary-entry">
          <h5>Diary Entry</h5>
          <p>{state.selectedMilestone.diary_entry}</p>
        </div>

        <div className="photos">
          <h5>Photos</h5>
          <div className="photos-container">
            <img src={`/uploads/${state.selectedMilestone.image1}`} alt='image1' onClick={() => handleFullImageModal(`/uploads/${state.selectedMilestone.image1}`)} />
            <img src={`/uploads/${state.selectedMilestone.image2}`} alt='image2' onClick={() => handleFullImageModal(`/uploads/${state.selectedMilestone.image2}`)}/>
            <img src={`/uploads/${state.selectedMilestone.image3}`} alt='image3' onClick={() => handleFullImageModal(`/uploads/${state.selectedMilestone.image3}`)}/>
            <img src={`/uploads/${state.selectedMilestone.image4}`} alt='image4' onClick={() => handleFullImageModal(`/uploads/${state.selectedMilestone.image4}`)} />
          </div>
        </div>

        {imageModalToggle.toggleState && (<FullImageModal imageUrl={fullImage} closeModal={imageModalToggle.handleToggle} />)}

      </div>
    </div>
  );
};

export default MilestoneViewModal;