import React from 'react';


const MilestoneListItem = ({ milestoneList, getClickedMilestone, milestoneToggle,timelineEditToggle,
  milestoneEditToggle,handleDeleteMilestone,timelineStyleController}) => {
  const { id ,milestone_id, milestone_title, milestone_date  } = milestoneList;
  const isoDate = new Date(milestone_date).toISOString();
  const formattedDate = isoDate.substring(0, 10); // Extracting YYYY-MM-DD

  return (
    <div className={`timeline ${timelineStyleController}`} 
      onClick={() => {
        getClickedMilestone(milestone_id);
        milestoneToggle.handleToggle();
      }}>
      <div className="card" id="milestone-card">
        <div className="card-body p-4">
          <h4>{milestone_title}</h4>
          <p className="mb-0">{formattedDate}</p>
        </div>
      </div>
      {timelineEditToggle.toggleState && <div>
        <button onClick={() => { 
          milestoneEditToggle.handleToggle() 
          getClickedMilestone(milestone_id)
        }}>Edit</button>
        <button onClick={() => { 
        handleDeleteMilestone(id,milestone_id)}}>Delete</button>
      </div>}
    </div>
  );
}

export default MilestoneListItem;

