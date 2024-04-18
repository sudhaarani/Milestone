import React from 'react';

import ListOfTimelines from "./ListOfTimelines";

const HomePage = ({ state, isLoggedIn, timelineToggle, handleSelectedTimeline, handleFavourites,getMilestonesByTimeline }) => {
  return (
    <div>
      <ListOfTimelines
        state={state}
        isLoggedIn={isLoggedIn}
        timelineToggle={timelineToggle}
        handleSelectedTimeline={handleSelectedTimeline}
        handleFavourites={handleFavourites}
        getMilestonesByTimeline={getMilestonesByTimeline}
      />
    </div>
  );
}

export default HomePage;
