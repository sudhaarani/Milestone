import React from 'react';
import MilestoneListItem from './MilestoneListItem';
//import '../styles/MilestoneList.css'

const MilestoneList = ({ state, milestoneToggle, getClickedMilestone,
  milestoneEditToggle,timelineEditToggle}) => {
  const MilestoneListArray = state.milestonesByTimeline.map((milestoneList) => {
    return (<MilestoneListItem
              key={milestoneList.milestone_id}
              milestoneList={milestoneList}
              getClickedMilestone={getClickedMilestone}
              milestoneToggle={milestoneToggle}
              milestoneEditToggle={milestoneEditToggle}
              timelineEditToggle={timelineEditToggle}
            />)
  });

  return (
    <div>
      {MilestoneListArray}
    </div>
  );
};

export default MilestoneList;
