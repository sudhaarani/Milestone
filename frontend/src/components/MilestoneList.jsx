import React from 'react';
import MilestoneListItem from './MilestoneListItem';
import '../styles/TimelineViewModal.css';


const MilestoneList = ({ state, milestoneToggle, getClickedMilestone,
  milestoneEditToggle,timelineEditToggle,handleDeleteMilestone}) => {
  const MilestoneListArray = state.milestonesByTimeline.map((milestoneList, index) => {
  const timelineStyleController = index % 2 === 0 ? 'left' : 'right';
        // changes orientation of milestone card to be on left or right side of timeline
//import '../styles/MilestoneList.css'
    return (<MilestoneListItem
              key={milestoneList.milestone_id}
              milestoneList={milestoneList}
              getClickedMilestone={getClickedMilestone}
              milestoneToggle={milestoneToggle}
              timelineStyleController={timelineStyleController}
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
