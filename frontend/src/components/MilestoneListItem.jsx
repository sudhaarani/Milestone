import React from 'react';
import '../styles/TimelineCard.css'
//import FavButton from "./FavButton";

const MilestoneListItem = ({ milestoneList, getClickedMilestone, milestoneToggle, timelineStyleController}) => {

  const { milestone_id, milestone_title, milestone_date  } = milestoneList;
  const isoDate = new Date(milestone_date).toISOString();
  const formattedDate = isoDate.substring(0, 10); // Extracting YYYY-MM-DD

  return (
    <div className={`timeline ${timelineStyleController}`} 
      onClick={() => {
        getClickedMilestone(milestone_id);
        milestoneToggle.handleToggle();
      }}>
      <div className="card">
        <div className="card-body p-4">
          <h3>{milestone_title}</h3>
          <p className="mb-0">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
}

export default MilestoneListItem;

