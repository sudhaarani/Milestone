import React from 'react';
import MilestoneListItem from './MilestoneListItem';
//import '../styles/ListOfTimelines.css'

const MilestoneList = ({ state }) => {
  const MilestoneListArray = state.milestonesByTimeline.map((milestoneList) => {
    return (<MilestoneListItem
              key={milestoneList.milestone_id}
              milestoneList={milestoneList}
            />)
  });

  return (
    <div>
      {MilestoneListArray}
    </div>
  );
};

export default MilestoneList;
