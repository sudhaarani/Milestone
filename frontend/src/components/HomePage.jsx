import React from 'react';

import ListOfTimelines from "./ListOfTimelines";

const HomePage = ({ state, timelineToggle, handleSelectedTimeline, handleFavourites,getMilestonesByTimeline }) => {
  return (
    <div>
      <ListOfTimelines 
        state={state}
        timelineToggle={timelineToggle}
        handleSelectedTimeline={handleSelectedTimeline}
        handleFavourites={handleFavourites}
        getMilestonesByTimeline={getMilestonesByTimeline}
      />
    </div>
  );
}

export default HomePage;
