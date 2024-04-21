import React from 'react';
import MilestoneListItem from './MilestoneListItem';
import '../styles/TimelineViewModal.css';
import '../styles/TimelineEditModal.css';

const MilestoneList = ({ state, milestoneToggle, getClickedMilestone, milestoneEditToggle,timelineEditToggle,handleDeleteMilestone}) => {
  /* milestoneStyleController changes orientation of milestone card to be on left or right side of timeline */
  const MilestoneListArray = state.milestonesByTimeline.map((milestoneList, index) => {
    const milestoneStyleController = index % 2 === 0 ? 'left' : 'right';
    return (<MilestoneListItem
              key={milestoneList.milestone_id}
              milestoneList={milestoneList}
              getClickedMilestone={getClickedMilestone}
              milestoneToggle={milestoneToggle}
              milestoneStyleController={milestoneStyleController}
              milestoneEditToggle={milestoneEditToggle}
              timelineEditToggle={timelineEditToggle}
              handleDeleteMilestone={handleDeleteMilestone}
            />)
  });

  return (
      <div className="timeline-container"> 
        <div className="main-timeline" >
          {MilestoneListArray}
        </div>
      </div>
  );
};

export default MilestoneList;
