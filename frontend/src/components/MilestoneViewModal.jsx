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
          <h5>Photo(s)</h5>
          <div className="photos-container"> 
            {/* map through the 4 images for a milestone entry if they're not null */}
            {[1, 2, 3, 4].map((num) => {
              const imageKey = `image${num}`;
              const imageName = state.selectedMilestone[imageKey];
              return imageName && (
                <img key={num} src={`/uploads/${imageName}`} alt={`image${num}`}
                  onClick={() => handleFullImageModal(`/uploads/${imageName}`)} />
              );
            })}
          </div>
        </div>

        {imageModalToggle.toggleState && (<FullImageModal imageUrl={fullImage} closeModal={imageModalToggle.handleToggle} />)}

      </div>
    </div>
  );
};

export default MilestoneViewModal;
