import React from 'react';

import ListOfTimelines from "./ListOfTimelines";

const HomePage = ({ state, handleToggle, handleSelectedTimeline, handleFavourites,getMilestonesByTimeline }) => {
  return (
    <div>
      <ListOfTimelines 
        state={state}
        handleToggle={handleToggle}
        handleSelectedTimeline={handleSelectedTimeline}
        handleFavourites={handleFavourites}
        getMilestonesByTimeline={getMilestonesByTimeline}
      />
    </div>
  );
}

export default HomePage;
