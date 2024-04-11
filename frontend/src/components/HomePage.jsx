import React from 'react';

import ListOfTimelines from "./ListOfTimelines";

const HomePage = ({ state, handleToggle, handleSelectedTimeline, handleFavourites,
  getMilestonesByTimeline,handleTimelineEditClicked }) => {
  return (
    <div>
      <ListOfTimelines 
        state={state}
        handleToggle={handleToggle}
        handleSelectedTimeline={handleSelectedTimeline}
        handleFavourites={handleFavourites}
        getMilestonesByTimeline={getMilestonesByTimeline}
        handleTimelineEditClicked={handleTimelineEditClicked}
      />
    </div>
  );
}

export default HomePage;
