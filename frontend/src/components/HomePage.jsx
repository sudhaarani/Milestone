import React from 'react';

import ListOfTimelines from "./ListOfTimelines";

const HomePage = ({ state, timelineToggle, handleSelectedTimeline, handleFavourites,
  getMilestonesByTimeline,timelineEditToggle }) => {
  return (
    <div>
      <ListOfTimelines 
        state={state}
        timelineToggle={timelineToggle}
        handleSelectedTimeline={handleSelectedTimeline}
        handleFavourites={handleFavourites}
        getMilestonesByTimeline={getMilestonesByTimeline}
        timelineEditToggle={timelineEditToggle}
      />
    </div>
  );
}

export default HomePage;
