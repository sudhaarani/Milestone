import React from 'react';
import MilestoneListItem from './MilestoneListItem';
import '../styles/TimelineViewModal.css';

const MilestoneList = ({ state, milestoneToggle, getClickedMilestone }) => {

  const MilestoneListArray = state.milestonesByTimeline.map((milestoneList, index) => {
    const timelineStyleController = index % 2 === 0 ? 'left' : 'right';
        // changes orientation of milestone card to be on left or right side of timeline
    return (<MilestoneListItem
              key={milestoneList.milestone_id}
              milestoneList={milestoneList}
              getClickedMilestone={getClickedMilestone}
              milestoneToggle={milestoneToggle}
              timelineStyleController={timelineStyleController}
            />)
  });

  return (
    <div section style={{backgroundColor: "#F0F2F5"}}>
      <div className="container py-5" > 
        <div className="main-timeline">
          {MilestoneListArray}
        </div>
      </div>
    </div>
  );
};

export default MilestoneList;
