import React from 'react';
import MilestoneListItem from './MilestoneListItem';
//import '../styles/ListOfTimelines.css'

const MilestoneList = ({ state,handleMilestoneClicked,getClickedMilestone,isTimelineEditClicked }) => {
  const MilestoneListArray = state.milestonesByTimeline.map((milestoneList) => {
    return (<MilestoneListItem
              key={milestoneList.milestone_id}
              milestoneList={milestoneList}
              getClickedMilestone={getClickedMilestone}
      handleMilestoneClicked={handleMilestoneClicked}
      isTimelineEditClicked={isTimelineEditClicked}
            />)
  });

  return (
    <div>
      {MilestoneListArray}
    </div>
  );
};

export default MilestoneList;
