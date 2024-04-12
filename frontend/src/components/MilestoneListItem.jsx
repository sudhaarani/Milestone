import React from 'react';
import '../styles/TimelineCard.css'
//import FavButton from "./FavButton";

const MilestoneListItem = ({ milestoneList, getClickedMilestone, handleMilestoneClicked,
  isTimelineEditClicked,handleMilestoneEditClicked}) => {
  const { milestone_id, milestone_title, milestone_date  } = milestoneList;
  const isoDate = new Date(milestone_date).toISOString();
  const formattedDate = isoDate.substring(0, 10); // Extracting YYYY-MM-DD
  // console.log("formattedDate::",formattedDate);
  return (
    <>
      <div className='card' onClick={() => {
        getClickedMilestone(milestone_id)
        handleMilestoneClicked()
        }}> 
        <div className='card-body'>
          <p className='card-title'>{milestone_title}</p>
          <p className='card-text'>{formattedDate}</p>
        </div>
      </div>
      {isTimelineEditClicked && <div>
        <button onClick={() => { 
          handleMilestoneEditClicked() 
          getClickedMilestone(milestone_id)
          }}>Edit</button><button>Delete</button>
      </div>}
    </>
  );
}

export default MilestoneListItem;

