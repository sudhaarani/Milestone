import React from 'react';

import ListOfTimelines from "./ListOfTimelines";

const HomePage = ({ state, isLoggedIn, timelineToggle, handleSelectedTimeline, handleFavourites,getMilestonesByTimeline, getTimelinesOf1User }) => {
  return (
    <div>
      <ListOfTimelines
        state={state}
        isLoggedIn={isLoggedIn}
        timelineToggle={timelineToggle}
        handleSelectedTimeline={handleSelectedTimeline}
        handleFavourites={handleFavourites}
        getMilestonesByTimeline={getMilestonesByTimeline}
        getTimelinesOf1User={getTimelinesOf1User}
      />
    </div>
  );
}

export default HomePage;
